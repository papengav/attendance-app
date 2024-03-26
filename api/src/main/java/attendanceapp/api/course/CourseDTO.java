//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Create an entity to represent the version of Courses used for data transfer to the controller from clients.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.course;

//----------------------------------------------------------------------------------------------
// An entity to represent the version of Courses used for data transfer to the controller from clients.
//----------------------------------------------------------------------------------------------
public record CourseDTO(
        String name
) {}
