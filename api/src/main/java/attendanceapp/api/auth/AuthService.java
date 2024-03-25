//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Service layer to handle User authentication requests
//----------------------------------------------------------------------------------------------

package attendanceapp.api.auth;

import attendanceapp.api.jwt.JwtService;
import attendanceapp.api.exceptions.InvalidRoleException;
import attendanceapp.api.role.Role;
import attendanceapp.api.role.RoleRepository;
import attendanceapp.api.user.User;
import attendanceapp.api.user.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//---------------------------------------------------------------
// Provide services for authentication requests.
//---------------------------------------------------------------
@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
    }

    /**
     * Authenticate a User login
     *
     * @param request AuthDTO containing login credentials
     * @return AuthResponse with successful auth info or error message
     * @throws AuthenticationException Invalid login credentials
     * @throws InvalidRoleException This shouldn't happen but is necessary to appease compiler
     */
    public AuthResponse authenticate(AuthDTO request) throws AuthenticationException, InvalidRoleException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );

        // Authentication manager will verify if the user exists first so User is guaranteed to exist
        User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new UsernameNotFoundException("Invalid User"));

        String jwtToken = jwtService.generateToken(user);

        Role role = roleRepository.findById(user.roleId())
                .orElseThrow(() -> new InvalidRoleException("User exists but there was an error with their Role"));

        return new AuthResponse("Authentication successful", jwtToken, role.name());
    }
}
