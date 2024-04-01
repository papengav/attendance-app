//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Test proper functionality and outputs of endpoints from UserController
//----------------------------------------------------------------------------------------------

package attendanceapp.api.user;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;

import java.net.URI;

import static attendanceapp.api.utils.HeadersGenerator.getAdminHeaders;
import static attendanceapp.api.utils.HeadersGenerator.getStudentHeaders;
import static org.assertj.core.api.Assertions.assertThat;


//----------------------------------------------------------------------------------------------
// A testing class to test for proper functionality and outputs of endpoints from UserController
//----------------------------------------------------------------------------------------------
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerTest {

    @Autowired
    TestRestTemplate restTemplate;

    /**
     * Ensure that a User is created when all data and configuration is valid
     */
    @Test
    void shouldCreateANewUser() {
        // Only admins can create new users
        HttpHeaders headers = getAdminHeaders(restTemplate);

        // Data for new user
        String firstName = "John";
        String lastName = "Trachte";
        String studentCardId = "GHI789";
        String username = "trachteJohn";
        String password = "anotherPwd";
        int roleId = 3;

        // Construct DTO and send request
        UserDTO newUser = new UserDTO(firstName, lastName, studentCardId, username, password, roleId);
        HttpEntity<UserDTO> request = new HttpEntity<>(newUser, headers);

        ResponseEntity<User> createResponse = restTemplate.postForEntity("/users", request, User.class);

        // Assert HTTP status code
        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    /**
     * Ensure that a User is not created if the provided roleId is not associated with any existing Role
     */
    @Test
    void shouldNotCreateUserIfRoleIdDoesNotExist() {
        HttpHeaders headers = getAdminHeaders(restTemplate);

        String firstName = "John";
        String lastName = "Trachte";
        String studentCardId = "GHI789";
        String username = "trachteJohn";
        String password = "anotherPwd";
        int roleId = 99;    // Invalid roleId in our system

        UserDTO newUser = new UserDTO(firstName, lastName, studentCardId, username, password, roleId);
        HttpEntity<UserDTO> request = new HttpEntity<>(newUser, headers);
        ResponseEntity<User> createResponse = restTemplate.postForEntity("/users", request, User.class);

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    /**
     * Ensure that a User is not created if the request User Role is Student and a studentCardId is not provided
     */
    @Test
    void shouldNotCreateUserIfRoleIsStudentAndStudentCardIdIsEmpty() {
        HttpHeaders headers = getAdminHeaders(restTemplate);

        String firstName = "John";
        String lastName = "Trachte";
        String studentCardId = "";      // should fail because this is empty
        String username = "trachteJohn";
        String password = "anotherPwd";
        int roleId = 3;                 // id associated with student

        UserDTO newUser = new UserDTO(firstName, lastName, studentCardId, username, password, roleId);
        HttpEntity<UserDTO> request = new HttpEntity<>(newUser, headers);
        ResponseEntity<User> createResponse = restTemplate.postForEntity("/users", request, User.class);

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    /**
     * Ensure that a User is not created if the request is coming from a non-admin User
     */
    @Test
    void shouldNotCreateUserIfNotRequestedByAdmin() {
        HttpHeaders headers = getStudentHeaders(restTemplate); // Students cannot create users

        String firstName = "John";
        String lastName = "Trachte";
        String studentCardId = "GHI789";
        String username = "trachteJohn";
        String password = "anotherPwd";
        int roleId = 3;

        UserDTO newUser = new UserDTO(firstName, lastName, studentCardId, username, password, roleId);
        HttpEntity<UserDTO> request = new HttpEntity<>(newUser, headers);
        ResponseEntity<User> createResponse = restTemplate.postForEntity("/users", request, User.class);

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }

    /**
     * Ensure that a User is not created if the request is coming from an unauthenticated User
     */
    @Test
    void shouldNotCreateUserIfNotAuthenticated() {
        String firstName = "John";
        String lastName = "Trachte";
        String studentCardId = "GHI789";
        String username = "trachteJohn";
        String password = "anotherPwd";
        int roleId = 3;

        UserDTO newUser = new UserDTO(firstName, lastName, studentCardId, username, password, roleId);
        // No auth headers included in request
        ResponseEntity<User> createResponse = restTemplate.postForEntity("/users", newUser, User.class);

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }
}
