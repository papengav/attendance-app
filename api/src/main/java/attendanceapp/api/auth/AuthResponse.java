//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Provide standard for response to authentication requests
//----------------------------------------------------------------------------------------------

package attendanceapp.api.auth;

//---------------------------------------------------------------
// Provide standard for response to authentication requests
//---------------------------------------------------------------
public record AuthResponse(
    String message,
    String token,
    String role
){}
