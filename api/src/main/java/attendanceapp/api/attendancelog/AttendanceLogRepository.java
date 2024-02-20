//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Provide an interface that allows Attendance Logs to be queried to and from the database.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.attendancelog;

import org.springframework.data.repository.CrudRepository;

//----------------------------------------------------------------------------------------------
// An interface that allows Attendance Logs to be queried to and from the database.
//----------------------------------------------------------------------------------------------
public interface AttendanceLogRepository extends CrudRepository<AttendanceLog, Integer> {
}
