//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Test proper functionality and outputs of endpoints from SectionController
//----------------------------------------------------------------------------------------------

package attendanceapp.api.section;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import java.net.URI;

import static attendanceapp.api.utils.HeadersGenerator.getAdminHeaders;
import static attendanceapp.api.utils.HeadersGenerator.getStudentHeaders;
import static org.assertj.core.api.Assertions.assertThat;

//----------------------------------------------------------------------------------------------
// A testing class to test for proper functionality and outputs of endpoints from SectionController
//----------------------------------------------------------------------------------------------
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SectionControllerTest {

    @Autowired
    TestRestTemplate restTemplate;

    /**
     * Ensure that a Section is created when all data and configuration is valid
     */
    @Test
    void shouldCreateANewSection() {
        HttpHeaders adminHeader = getAdminHeaders(restTemplate);

        int roomNum = 1;
        int numberOfStudents = 10;
        int courseId = 1; // Provided from data.sql

        SectionDTO newSection = new SectionDTO(roomNum, numberOfStudents, courseId);
        HttpEntity<SectionDTO> request = new HttpEntity<>(newSection, adminHeader);
        ResponseEntity<Section> createResponse = restTemplate.postForEntity("/sections", request, Section.class);

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        // Verify location header points to created object
        URI locationOfNewCourse = createResponse.getHeaders().getLocation();
        HttpEntity<Void> getRequest = new HttpEntity<>(adminHeader);
        ResponseEntity<String> getResponse = restTemplate.exchange(locationOfNewCourse, HttpMethod.GET, getRequest, String.class);
        assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    /**
     * Ensure that a Section is not created if the Course ID is invalid
     */
    @Test
    void shouldNotCreateANewSectionIfCourseIdInvalid() {
        HttpHeaders adminHeader = getAdminHeaders(restTemplate);

        int roomNum = 1;
        int numberOfStudents = 10;
        int courseId = 99999; // Not provided in test data - should cause BAD REQUEST

        SectionDTO newSection = new SectionDTO(roomNum, numberOfStudents, courseId);
        HttpEntity<SectionDTO> request = new HttpEntity<>(newSection, adminHeader);
        ResponseEntity<Section> createResponse = restTemplate.postForEntity("/sections", request, Section.class);

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    /**
     * Ensure that a Section is not created if the request is coming from a non-admin User
     */
    @Test
    void shouldNotCreateANewSectionIfNotRequestByAdmin() {
        HttpHeaders studentHeaders = getStudentHeaders(restTemplate);

        int roomNum = 1;
        int numberOfStudents = 10;
        int courseId = 1; // Provided from data.sql

        SectionDTO newSection = new SectionDTO(roomNum, numberOfStudents, courseId);
        HttpEntity<SectionDTO> request = new HttpEntity<>(newSection, studentHeaders);
        ResponseEntity<Section> createResponse = restTemplate.postForEntity("/sections", request, Section.class);

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }

    /**
     * Ensure that a Section is not created if the request is coming from an unauthenticated User
     */
    @Test
    void shouldNotCreateANewSectionIfNotAuthenticated() {
        int roomNum = 1;
        int numberOfStudents = 10;
        int courseId = 1; // Provided from data.sql

        SectionDTO newSection = new SectionDTO(roomNum, numberOfStudents, courseId);
        HttpEntity<SectionDTO> request = new HttpEntity<>(newSection);
        ResponseEntity<Section> createResponse = restTemplate.postForEntity("/sections", request, Section.class);

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }
}
