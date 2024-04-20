//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Service layer to handle UserDTO validation and User construction.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.user;

import attendanceapp.api.exceptions.InvalidRoleException;
import attendanceapp.api.exceptions.InvalidUserException;
import attendanceapp.api.exceptions.MissingStudentCardIdException;
import attendanceapp.api.role.Role;
import attendanceapp.api.role.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

//---------------------------------------------------------------
// Provide services for UserDTO validation and User construction.
//---------------------------------------------------------------
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Find a User by their ID
     *
     * @param id ID of the requested User
     * @return User found
     * @throws InvalidUserException No User associated with the provided ID
     */
    public User findById(int id) throws InvalidUserException {
        return userRepository.findById(id)
                .orElseThrow(() -> new InvalidUserException("Requested User does not exist"));
    }

    /**
     * Find a User by their Username
     *
     * @param username Username of the requested User
     * @return User found
     * @throws InvalidUserException No User associated with the provided username
     */
    public User findByUsername(String username) throws InvalidUserException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new InvalidUserException("Requested User does not exist"));
    }

    /**
     * Construct a page of Users using Spring Data's Pagination feature
     *
     * @param pageable Pageable object containing page number, size and Sorting rule with default ids asc
     * @return Page containing found Users
     */
    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(
                PageRequest.of(
                        pageable.getPageNumber(),
                        pageable.getPageSize(),
                        pageable.getSortOr(Sort.by(Sort.Direction.ASC, "id"))
                ));
    }

    /**
     * Construct a page of Users using Spring Data's Pagination feature
     * Users must have Role associated with specified roleId
     *
     * @param roleId ID associated with desired Role
     * @param pageable Pageable object containing page number, size and Sorting rule with default ids asc
     * @return Page containing found Users
     */
    public Page<User> findAllByRoleId(int roleId, Pageable pageable) {
        getRole(roleId);

        return userRepository.findAllByRoleId(
                roleId,
                PageRequest.of(
                        pageable.getPageNumber(),
                        pageable.getPageSize(),
                        pageable.getSortOr(Sort.by(Sort.Direction.ASC, "id"))
                ));
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
        Role role = getRole(userRequest.getRoleId());
        String encodedPassword = passwordEncoder.encode(userRequest.getPassword());

        verifyStudentCardId(userRequest.getStudentCardId(), role); // Make sure if request is for a Student that a valid studentCardId has been provided
        User newUser = new User(null, userRequest.getFirstName(), userRequest.getLastName(), userRequest.getStudentCardId(), userRequest.getUsername(), encodedPassword, userRequest.getRoleId());

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
        if (studentCardId.isEmpty() && role.getName().equals("Student")) {
            throw new MissingStudentCardIdException("User request for User with Role: 'Student' must contain studentCardId");
        }
    }
}
