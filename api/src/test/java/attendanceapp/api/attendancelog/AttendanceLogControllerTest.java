//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Test proper functionality and outputs of endpoints from AttendanceLogController
//----------------------------------------------------------------------------------------------

package attendanceapp.api.attendancelog;

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
// A testing class to test for proper functionality and outputs of endpoints from AttendanceLogController
//----------------------------------------------------------------------------------------------
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AttendanceLogControllerTest {
    @Autowired
    TestRestTemplate restTemplate;

    /**
     * Ensure that an AttendanceLog is created when all data and configuration is valid.
     */
    @Test
    @DirtiesContext
    void shouldCreateANewAttendanceLog() {
        // Get AttendanceLogDTO body info. This will all be supplied by the client sending in the request normally
        String studentCardId = "ABC123";
        int sectionId = 1;

        // Create request - Takes in a DTO and returns the actual object with server-calculated values
        AttendanceLogDTO newLog = new AttendanceLogDTO(studentCardId, sectionId);
        ResponseEntity<AttendanceLog> createResponse = restTemplate.postForEntity("/attendancelogs", newLog, AttendanceLog.class);      // By setting type to AttendanceLog, it essentially asserts that we were returned the expected object.

        // Verify HTTP status code
        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        // Verify location header points to created object
        URI locationOfNewLog = createResponse.getHeaders().getLocation();
        ResponseEntity<String> getResponse = restTemplate.getForEntity(locationOfNewLog, String.class);
        assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    /**
     * Ensure that an AttendanceLog is not created if the studentCardId isn't associated with a user.
     */
    @Test
    void shouldNotCreateAttendanceLogWhenStudentCardIdDoesNotExist() {
        String studentCardId = "This Doesn't Exist";
        int sectionId = 1;

        AttendanceLogDTO newLog = new AttendanceLogDTO(studentCardId, sectionId);
        ResponseEntity<AttendanceLog> createResponse = restTemplate.postForEntity("/attendancelogs", newLog, AttendanceLog.class);

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    /**
     * Ensure that an AttendanceLog is not created if the sectionId / section does not exist.
     */
    @Test
    void shouldNotCreateAttendanceLogWhenSectionIdDoesNotExist() {
        String studentCardId = "ABC123";
        int sectionId = -1;

        AttendanceLogDTO newLog = new AttendanceLogDTO(studentCardId, sectionId);
        ResponseEntity<AttendanceLog> createResponse = restTemplate.postForEntity("/attendancelogs", newLog, AttendanceLog.class);

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    /**
     * Ensure that an AttendanceLog is not created if the student associated with studentCardId is not enrolled in the existing section associated with sectionId.
     */
    @Test
    void shouldNotCreateAttendanceLogWhenStudentIsNotEnrolledInSection() {
        String studentCardId = "DEF456";
        int sectionId = 1;

        AttendanceLogDTO newLog = new AttendanceLogDTO(studentCardId, sectionId);
        ResponseEntity<AttendanceLog> createResponse = restTemplate.postForEntity("/attendancelogs", newLog, AttendanceLog.class);

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }
}