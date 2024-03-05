//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Create an entity to represent the authentication data used for data transfer to the controller from clients..
//----------------------------------------------------------------------------------------------

package attendanceapp.api.auth;

//----------------------------------------------------------------------------------------------
// An entity to represent the authentication data used for data transfer to the controller from clients.
//----------------------------------------------------------------------------------------------
public record AuthDTO(
        String username,
        String password
){}
