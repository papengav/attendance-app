//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Service layer to handle SectionDTO validation and Section construction.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.section;

import attendanceapp.api.course.CourseService;
import attendanceapp.api.exceptions.InvalidCourseException;
import attendanceapp.api.exceptions.InvalidSectionException;
import org.springframework.stereotype.Service;

//---------------------------------------------------------------
// Provide services for SectionDTO validation and Section construction.
//---------------------------------------------------------------
@Service
public class SectionService {

    SectionRepository sectionRepository;
    CourseService courseService;

    /**
     * Construct the SectionService
     *
     * @param sectionRepository Section Repository where Sections are stored
     * @param courseService CourseService to perform business logic related to Courses
     */
    public SectionService(SectionRepository sectionRepository, CourseService courseService) {
        this.sectionRepository = sectionRepository;
        this.courseService = courseService;
    }

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
        validateCourseId(sectionRequest.courseId());
        Section newSection = new Section(null, sectionRequest.roomNum(),
                sectionRequest.numberOfStudent(),
                sectionRequest.courseId());

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
