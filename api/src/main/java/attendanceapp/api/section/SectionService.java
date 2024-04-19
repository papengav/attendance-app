//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Service layer to handle SectionDTO validation and Section construction.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.section;

import attendanceapp.api.course.CourseService;
import attendanceapp.api.exceptions.InvalidCourseException;
import attendanceapp.api.exceptions.InvalidRoleException;
import attendanceapp.api.exceptions.InvalidSectionException;
import attendanceapp.api.exceptions.InvalidUserException;
import attendanceapp.api.role.Role;
import attendanceapp.api.role.RoleRepository;
import attendanceapp.api.user.User;
import attendanceapp.api.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

//---------------------------------------------------------------
// Provide services for SectionDTO validation and Section construction.
//---------------------------------------------------------------
@Service
@RequiredArgsConstructor
public class SectionService {

    private final SectionRepository sectionRepository;
    private final CourseService courseService;
    private final UserService userService;
    private final RoleRepository roleRepository;

    /**
     * Find a Section by its ID
     *
     * @param id ID of requested Section
     * @return Section found
     * @throws InvalidSectionException No Section associated with provided ID
     */
    public Section findById(int id) throws InvalidSectionException {
        return sectionRepository.findById(id)
                .orElseThrow(() -> new InvalidSectionException("Requested Section does not exist"));
    }

    /**
     * Create a new Section
     *
     * @param sectionRequest SectionDTO containing data for new Section
     * @return new Section
     */
    public Section createSection(SectionDTO sectionRequest) {
        validateCourseId(sectionRequest.getCourseId());
        validateProfessorId(sectionRequest.getProfessorId());

        Section newSection = new Section(sectionRequest.getRoomNum(),
                sectionRequest.getNumberOfStudent(),
                sectionRequest.getCourseId(),
                sectionRequest.getProfessorId());

        return sectionRepository.save(newSection);
    }

    /**
     * Validate the ID of the Course a new Section is being created under
     *
     * @param courseId ID of the Course
     * @throws InvalidCourseException If the Course does not exist
     */
    private void validateCourseId(int courseId) throws InvalidCourseException {
        courseService.findById(courseId);
    }

    /**
     * Validate that the User getting assigned to a new Section is an existing Professor
     *
     * @param professorId ID of the User to assign
     * @throws InvalidUserException User does not exist
     * @throws InvalidRoleException User does not have Professor Role
     */
    private void validateProfessorId(int professorId) throws InvalidUserException, InvalidRoleException {
        User user = userService.findById(professorId);
        // This should never throw an error
        Role userRole = roleRepository.findById(user.getRoleId())
                .orElseThrow(() -> new InvalidRoleException("User somehow has a role that does not exist"));

        if (!userRole.getName().equals("Professor")) {
            throw new InvalidRoleException("Cannot assign User without Role Professor to Section");
        }
    }
}
