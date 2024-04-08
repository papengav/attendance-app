//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Service layer to handle SectionDTO validation and Section construction.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.section;

import attendanceapp.api.course.CourseService;
import attendanceapp.api.exceptions.InvalidCourseException;
import attendanceapp.api.exceptions.InvalidSectionException;
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
        Section newSection = new Section(sectionRequest.getRoomNum(),
                sectionRequest.getNumberOfStudent(),
                sectionRequest.getCourseId());

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
}
