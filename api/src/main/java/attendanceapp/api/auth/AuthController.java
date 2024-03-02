//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Provide a mapping for clients to authenticate.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.auth;

import attendanceapp.api.role.Role;
import attendanceapp.api.role.RoleRepository;
import attendanceapp.api.user.User;
import attendanceapp.api.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

//---------------------------------------------------------------
// Provide mappings for clients to interact with AttendanceLogs.
//---------------------------------------------------------------
@RestController
@RequestMapping("/login")
public class AuthController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final Logger logger;

    /**
     * Construct the AuthController
     *
     * @param userRepository Repository containing User objects
     * @param roleRepository Repository containing Role objects
     */
    public AuthController(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.logger = LoggerFactory.getLogger(AuthController.class);
    }

    /* TODO: Implement with Spring Security and JWT
        Will include JwtFilterChain, Security Config, JWT Service, etc
        I'm going to try and do this over Spring Break
     */

    /**
     * Login a user to the system
     *
     * @param newAuthRequest AuthDTO containing username and password
     * @return int roleId if associated User exists
     */
    @PostMapping
    private ResponseEntity<String> loginUser(@RequestBody AuthDTO newAuthRequest) {
        String username = newAuthRequest.username();
        String password = newAuthRequest.password();

        Optional<User> userOptional = userRepository.findByUsernameAndPassword(username, password);

        if (userOptional.isEmpty()) {
            logger.warn("Invalid credentials in login request with auth request: " + newAuthRequest);
            return ResponseEntity.notFound().build();
        }

        User user = userOptional.get();
        Optional<Role> roleOptional = roleRepository.findById(user.roleId());

        if (roleOptional.isEmpty()) {
            logger.warn("Valid User attempted to login but somehow has a role that doesn't exist");
            return ResponseEntity.internalServerError().body("User is valid but somehow has a role that doesn't exist");
        }

        Role role = roleOptional.get();

        logger.info("A User was logged in");
        logger.trace("Logged in User: " + user);
        return ResponseEntity.status(HttpStatus.CREATED).body(role.name());

    }
}
