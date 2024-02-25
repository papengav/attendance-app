//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Provide an interface that allows Enrollments to be queried to and from the database.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.enrollment;

import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

//----------------------------------------------------------------------------------------------
// An interface that allows Enrollments to be queried to and from the database.
//----------------------------------------------------------------------------------------------
public interface EnrollmentRepository extends CrudRepository<Enrollment, Integer> {

    /**
     * Custom query to find an enrollment by studentId and sectionId.
     *
     * @param studentId int id of student in requested enrollment.
     * @param sectionId int id of section in requested enrollment.
     * @return Enrollment object if it exists.
     */
    Optional<Enrollment> findByStudentIdAndSectionId(int studentId, int sectionId);

    /**
     * Custom query to find all of a Student's Enrollments by studentId
     *
     * @param studentId int id of student in requested enrollments
     * @return List of found Enrollments
     */
    List<Enrollment> findAllByStudentId(int studentId);
}
