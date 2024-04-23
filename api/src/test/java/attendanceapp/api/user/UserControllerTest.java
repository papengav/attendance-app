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
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

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

        ResponseEntity<UserResponse> createResponse = restTemplate.postForEntity("/users", request, UserResponse.class);

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
        ResponseEntity<UserResponse> createResponse = restTemplate.postForEntity("/users", request, UserResponse.class);

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
        ResponseEntity<UserResponse> createResponse = restTemplate.postForEntity("/users", request, UserResponse.class);

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
        ResponseEntity<UserResponse> createResponse = restTemplate.postForEntity("/users", request, UserResponse.class);

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
        ResponseEntity<UserResponse> createResponse = restTemplate.postForEntity("/users", newUser, UserResponse.class);

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }

    /**
     * Ensure that a List of Users following the request parameters is returned
     */
    @Test
    void shouldReturnAListOfUsers() {
        HttpHeaders headers = getAdminHeaders(restTemplate);
        int page = 0;
        int size = 2;

        UriComponentsBuilder ucb = UriComponentsBuilder.fromUriString("/users")
                .queryParam("page", page)
                .queryParam("size", size);

        HttpEntity<Void> getRequest = new HttpEntity<>(headers);
        ResponseEntity<List<UserResponse>> getResponse = restTemplate.exchange(
                ucb.toUriString(),
                HttpMethod.GET,
                getRequest,
                new ParameterizedTypeReference<List<UserResponse>>() {
        });

        assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(getResponse.getBody().size()).isEqualTo(size);
    }

    @Test
    void shouldNotReturnAListOfUsersIfNotRequestedByAdmin() {
        HttpHeaders headers = getStudentHeaders(restTemplate);
        int page = 0;
        int size = 2;

        UriComponentsBuilder ucb = UriComponentsBuilder.fromUriString("/users")
                .queryParam("page", page)
                .queryParam("size", size);

        HttpEntity<Void> getRequest = new HttpEntity<>(headers);
        ResponseEntity<List<UserResponse>> getResponse = restTemplate.exchange(
                ucb.toUriString(),
                HttpMethod.GET,
                getRequest,
                new ParameterizedTypeReference<List<UserResponse>>() {
                });

        assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }

    @Test
    void shouldNotReturnAListOfUsersIfNotAuthenticated() {
        HttpHeaders headers = new HttpHeaders(); // empty
        int page = 0;
        int size = 2;

        UriComponentsBuilder ucb = UriComponentsBuilder.fromUriString("/users")
                .queryParam("page", page)
                .queryParam("size", size);

        HttpEntity<Void> getRequest = new HttpEntity<>(headers);
        ResponseEntity<List<UserResponse>> getResponse = restTemplate.exchange(
                ucb.toUriString(),
                HttpMethod.GET,
                getRequest,
                new ParameterizedTypeReference<List<UserResponse>>() {
                });

        assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }
<<<<<<< Updated upstream
=======

    /**
     * Ensure that a List of Users following the request parameters is returned
     */
    @Test
    void shouldReturnAListOfUsersByRoleId() {
        HttpHeaders headers = getAdminHeaders(restTemplate);
        int page = 0;
        int size = 1;
        int roleId = 1;

        UriComponentsBuilder ucb = UriComponentsBuilder.fromUriString("/users/by-roleId")
                .queryParam("roleId", roleId)
                .queryParam("page", page)
                .queryParam("size", size);

        HttpEntity<Void> getRequest = new HttpEntity<>(headers);
        ResponseEntity<List<UserResponse>> getResponse = restTemplate.exchange(
                ucb.toUriString(),
                HttpMethod.GET,
                getRequest,
                new ParameterizedTypeReference<List<UserResponse>>() {
                });

        assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(getResponse.getBody().size()).isEqualTo(size);
    }

    /**
     * Ensure that a List of Users is not returned if the requested roleId is not associated with any existing Roles
     */
    @Test
    void shouldNotReturnAListOfUsersByRoleIdIfRoleIdInvalid() {
        HttpHeaders headers = getAdminHeaders(restTemplate);
        int page = 0;
        int size = 2;
        int roleId = 999999999;

        UriComponentsBuilder ucb = UriComponentsBuilder.fromUriString("/users/by-roleId")
                .queryParam("roleId", roleId)
                .queryParam("page", page)
                .queryParam("size", size);

        HttpEntity<Void> getRequest = new HttpEntity<>(headers);
        ResponseEntity<List<UserResponse>> getResponse = restTemplate.exchange(
                ucb.toUriString(),
                HttpMethod.GET,
                getRequest,
                new ParameterizedTypeReference<List<UserResponse>>() {
                });

        assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    /**
     * Ensure that a list of Users is not returned if not requested by an Admin
     */
    @Test
    void shouldNotReturnAListOfUsersByRoleIdIfNotRequestedByAdmin() {
        HttpHeaders headers = getStudentHeaders(restTemplate);
        int page = 0;
        int size = 2;
        int roleId = 1;

        UriComponentsBuilder ucb = UriComponentsBuilder.fromUriString("/users/by-roleId")
                .queryParam("roleId", roleId)
                .queryParam("page", page)
                .queryParam("size", size);

        HttpEntity<Void> getRequest = new HttpEntity<>(headers);
        ResponseEntity<List<UserResponse>> getResponse = restTemplate.exchange(
                ucb.toUriString(),
                HttpMethod.GET,
                getRequest,
                new ParameterizedTypeReference<List<UserResponse>>() {
                });

        assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }

    /**
     * Ensure that a list of Users is not returned if not request is not authenticated
     */
    @Test
    void shouldNotReturnAListOfUsersByRoleIdIfNotAuthenticated() {
        HttpHeaders headers = new HttpHeaders(); // empty
        int page = 0;
        int size = 2;
        int roleId = 1;

        UriComponentsBuilder ucb = UriComponentsBuilder.fromUriString("/users/by-roleId")
                .queryParam("roleId", roleId)
                .queryParam("page", page)
                .queryParam("size", size);

        HttpEntity<Void> getRequest = new HttpEntity<>(headers);
        ResponseEntity<List<UserResponse>> getResponse = restTemplate.exchange(
                ucb.toUriString(),
                HttpMethod.GET,
                getRequest,
                new ParameterizedTypeReference<List<UserResponse>>() {
                });

        assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }
>>>>>>> Stashed changes
}
