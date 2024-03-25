//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Service layer to handle UserDTO validation and User construction.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.user;

import attendanceapp.api.exceptions.InvalidRoleException;
import attendanceapp.api.exceptions.MissingStudentCardIdException;
import attendanceapp.api.role.Role;
import attendanceapp.api.role.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

//---------------------------------------------------------------
// Provide services for UserDTO validation and User construction.
//---------------------------------------------------------------
@Service
public class UserService {

    UserRepository userRepository;
    RoleRepository roleRepository;

    /**
     * Construct the UserService
     *
     * @param userRepository UserRepository containing User objects
     * @param roleRepository RoleRepository containing Role objects
     */
    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    /**
     * Validate and create a User
     *
     * @param userRequest UserDTO containing data related to the new User
     * @return User if it was created
     * @throws InvalidRoleException roleId not associated with any Role
     * @throws MissingStudentCardIdException Requested to create student but didn't provide a studentCardId
     */
    public User createUser(UserDTO userRequest) throws InvalidRoleException, MissingStudentCardIdException {
        Role role = getRole(userRequest.roleId());
        verifyStudentCardId(userRequest.studentCardId(), role); // Make sure if request is for a Student that a valid studentCardId has been provided
        User newUser = new User(null, userRequest.firstName(), userRequest.lastName(), userRequest.studentCardId(), userRequest.username(), userRequest.password(), userRequest.roleId());

        return userRepository.save(newUser);
    }

    /**
     * Find a Role by its ID
     *
     * @param roleId id of the requested role
     * @return Role if it exists
     * @throws InvalidRoleException No existing Role associated with roleId
     */
    private Role getRole(int roleId) throws InvalidRoleException {
        Optional<Role> roleOptional = roleRepository.findById(roleId);

        if (roleOptional.isEmpty()) {
            throw new InvalidRoleException("No Role associated with roleId");
        }

        return roleOptional.get();
    }

    /**
     * Verify necessary data was provided to create a User with the Student role
     *
     * @param studentCardId String id associated with the students id card
     * @param role role for the new user
     * @throws MissingStudentCardIdException Requested to create a student but didn't provide a studentCardId
     */
    private void verifyStudentCardId(String studentCardId, Role role) throws MissingStudentCardIdException {
        if (studentCardId.isEmpty() && role.name().equals("Student")) {
            throw new MissingStudentCardIdException("User request for User with Role: 'Student' must contain studentCardId");
        }
    }
}
