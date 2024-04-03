//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Provide a mapping for clients to authenticate.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.auth;

import attendanceapp.api.exceptions.InvalidRoleException;
import attendanceapp.api.role.Role;
import attendanceapp.api.role.RoleRepository;
import attendanceapp.api.user.User;
import attendanceapp.api.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

//---------------------------------------------------------------
// Provide mappings for clients to interact with AttendanceLogs.
//---------------------------------------------------------------
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/login")
public class AuthController {

    private final AuthService authService;
    private final Logger logger;

    /**
     * Construct the AuthController
     *
     * @param authService AuthService to perform business logic
     */
    public AuthController(AuthService authService) {
        this.authService = authService;
        this.logger = LoggerFactory.getLogger(AuthController.class);
    }

    /**
     * Login a user to the system
     *
     * @param newAuthRequest AuthDTO containing username and password
     * @return AuthResponse containing status message, JWT, and User role name
     */
    @PostMapping
    private ResponseEntity<AuthResponse> loginUser(@RequestBody AuthDTO newAuthRequest) {
        try {
            AuthResponse response = authService.authenticate(newAuthRequest);
            logger.info("A User logged in");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
        catch (AuthenticationException e) {
            logger.warn("Invalid credentials in login with request: " + newAuthRequest);
            return ResponseEntity.notFound().build();
        }
        catch (InvalidRoleException e) {
            logger.warn("Valid User attempted to login but somehow has a role that doesn't exist");
            return ResponseEntity.internalServerError().body(new AuthResponse(e.getMessage(), null, null));
        }
    }
}
