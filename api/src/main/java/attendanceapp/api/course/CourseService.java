//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Service layer to handle CourseDTO validation and Course construction.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.course;

import attendanceapp.api.exceptions.InvalidCourseException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

//---------------------------------------------------------------
// Provide services for CourseDTO validation and Course construction.
//---------------------------------------------------------------
@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    /**
     * Find a Course by its ID
     *
     * @param id ID of the Course to be obtained
     * @return Course if found
     * @throws InvalidCourseException If ID is not associated with any Courses
     */
    public Course findById(int id) throws InvalidCourseException {
         return courseRepository.findById(id)
                .orElseThrow(() -> new InvalidCourseException("Requested Course does not exist"));
    }

    /**
     * Create a new Course
     * Very minimal logic, Courses are only composed of a name right now
     *
     * @param courseRequest CourseDTO containing name of new Course
     * @return created Course
     */
    public Course createCourse(CourseDTO courseRequest) {
        Course newCourse = new Course(courseRequest.getName(), 0);

        return courseRepository.save(newCourse);
    }
}
