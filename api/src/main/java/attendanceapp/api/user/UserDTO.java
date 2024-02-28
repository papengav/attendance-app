//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Create an entity to represent the version of Users used for data transfer to the controller from clients.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.user;

//----------------------------------------------------------------------------------------------
// An entity to represent the version of Users used for data transfer to the controller from clients.
//----------------------------------------------------------------------------------------------
public record UserDTO(
        String firstName,
        String lastName,
        String studentCardId,
        String username,
        String password,
        int roleId
) {}
