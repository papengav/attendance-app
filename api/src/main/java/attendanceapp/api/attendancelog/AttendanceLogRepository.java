//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Provide an interface that allows Attendance Logs to be queried to and from the database.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.attendancelog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

//----------------------------------------------------------------------------------------------
// An interface that allows Attendance Logs to be queried to and from the database.
//----------------------------------------------------------------------------------------------
public interface AttendanceLogRepository extends CrudRepository<AttendanceLog, Integer>, PagingAndSortingRepository<AttendanceLog, Integer> {

    /**
     * Custom query to search for all AttendanceLogs associated with specified studentId and sectionId
     *
     * @param studentId ID associated with the desired User
     * @param sectionId ID associated with the desired Section
     * @param pageable Pageable object containing page number, size and Sorting rule with default ids asc
     * @return Page containing found AttendanceLogs
     */
    Page<AttendanceLog> findAllByStudentIdAndSectionId(int studentId, int sectionId, Pageable pageable);
}
