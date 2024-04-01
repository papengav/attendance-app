//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Provide a mapping for clients to interact with Users.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.user;

import attendanceapp.api.auth.AuthorityConstants;
import attendanceapp.api.exceptions.InvalidRoleException;
import attendanceapp.api.exceptions.MissingStudentCardIdException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Optional;


//---------------------------------------------------------------
// Provide mappings for clients to interact with AttendanceLogs.
//---------------------------------------------------------------
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/users")
class UserController {

    private final UserRepository userRepository;
    private final UserService userService;
    private final Logger logger;

    /**
     * Construct the UserController
     *
     * @param userRepository UserRepository containing User objects
     * @param userService UserService providing services related to User
     */
    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
        logger = LoggerFactory.getLogger(UserController.class);
    }

    /**
     * Get a User by id
     *
     * @param requestedId int id of requested User
     * @return User or 404 NOT FOUND
     */
    @GetMapping("/{requestedId}")
    @PreAuthorize(AuthorityConstants.ADMIN_AUTHORITY)
    public ResponseEntity<User> findById(@PathVariable int requestedId) {
        logger.info("A User was requested");
        logger.trace(String.format("Entering findById with parameters (requestedId = %d)", requestedId));

        Optional<User> userOptional = userRepository.findById(requestedId);

        if (userOptional.isPresent()) {
            logger.trace(String.format("Exiting findById with output User = %s", userOptional.get()));
            return ResponseEntity.ok().body(userOptional.get());
        }
        else {
            logger.warn("A client attempted to a request a User that does not exist");
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Create a new User. Only accessible by existing Administrator Users
     *
     * @param newUserRequest UserDTO from request-body containing data for new User
     * @param ucb UriComponentsBuilder injected by Spring-Web to create URI for new object.
     * @return User or 400 BAD REQUEST OR 401 UNAUTHORIZED OR 403 FORBIDDEN
     */
    @PostMapping
    @PreAuthorize(AuthorityConstants.ADMIN_AUTHORITY)
    public ResponseEntity<User> createUser(@RequestBody UserDTO newUserRequest, UriComponentsBuilder ucb) {
        try {
            User savedUser = userService.createUser(newUserRequest);
            URI locationOfNewUser = ucb
                    .path("/users/{id}")
                    .buildAndExpand(savedUser.id())
                    .toUri();

            logger.info("A new User was created");
            logger.trace(String.format("Created User: %s", savedUser));
            return ResponseEntity.created(locationOfNewUser).body(savedUser);
        }
        catch (InvalidRoleException e) {
            logger.warn("Invalid Role: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
        catch (MissingStudentCardIdException e) {
            logger.warn("Invalid request: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
