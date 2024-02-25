//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Create an entity to represent the version of Attendance Logs used for data transfer to the controller from clients..
//----------------------------------------------------------------------------------------------

package attendanceapp.api.attendancelog;

//----------------------------------------------------------------------------------------------
// An entity to represent the version of Attendance Logs used for data transfer to the controller from clients.
//----------------------------------------------------------------------------------------------
public record AttendanceLogDTO(
        String studentCardId,
        int roomNum
){}
