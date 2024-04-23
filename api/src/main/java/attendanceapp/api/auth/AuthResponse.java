//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Provide standard for response to authentication requests
//----------------------------------------------------------------------------------------------

package attendanceapp.api.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

//---------------------------------------------------------------
// Provide standard for response to authentication requests
//---------------------------------------------------------------
@AllArgsConstructor
@Getter
public class AuthResponse {
    private String message;
    private String token;
    private String role;
}
