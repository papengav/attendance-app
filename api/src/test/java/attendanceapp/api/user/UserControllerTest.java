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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;

import java.net.URI;

import static org.assertj.core.api.Assertions.assertThat;


//----------------------------------------------------------------------------------------------
// A testing class to test for proper functionality and outputs of endpoints from UserController
//----------------------------------------------------------------------------------------------
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserControllerTest {

    @Autowired
    TestRestTemplate restTemplate;

    /**
     * Ensure that a User is created when all data and configuration is valid
     */
    @Test
    @DirtiesContext
    void shouldCreateANewUser() {
        // Data for new user
        String firstName = "John";
        String lastName = "Trachte";
        String studentCardId = "GHI789";
        String username = "trachteJohn";
        String password = "anotherPwd";
        int roleId = 3;

        // Construct DTO and send request
        UserDTO newUser = new UserDTO(firstName, lastName, studentCardId, username, password, roleId);
        ResponseEntity<User> createResponse = restTemplate.postForEntity("/users", newUser, User.class);

        // Assert HTTP status code
        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        // Assert user was created in returned location
        URI locationOfNewUser = createResponse.getHeaders().getLocation();
        ResponseEntity<User> getResponse = restTemplate.getForEntity(locationOfNewUser, User.class);
        assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    /**
     * Ensure that a User is not created if the provided roleId is not associated with any existing Role
     */
    @Test
    void shouldNotCreateUserIfRoleIdDoesNotExist() {
        String firstName = "John";
        String lastName = "Trachte";
        String studentCardId = "GHI789";
        String username = "trachteJohn";
        String password = "anotherPwd";
        int roleId = 99;    // Invalid roleId in our system

        UserDTO newUser = new UserDTO(firstName, lastName, studentCardId, username, password, roleId);
        ResponseEntity<User> createResponse = restTemplate.postForEntity("/users", newUser, User.class);

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    /**
     * Ensure that a User is not created if the request User Role is Student and a studentCardId is not provided
     */
    @Test
    void shouldNotCreateUserIfRoleIsStudentAndStudentCardIdIsEmpty() {
        String firstName = "John";
        String lastName = "Trachte";
        String studentCardId = "";      // should fail because this is empty
        String username = "trachteJohn";
        String password = "anotherPwd";
        int roleId = 3;                 // id associated with student

        UserDTO newUser = new UserDTO(firstName, lastName, studentCardId, username, password, roleId);
        ResponseEntity<User> createResponse = restTemplate.postForEntity("/users", newUser, User.class);

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

}
