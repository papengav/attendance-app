//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Provide a mapping for clients to interact with Courses.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.course;

import attendanceapp.api.auth.AuthorityConstants;
import attendanceapp.api.exceptions.InvalidCourseException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

//---------------------------------------------------------------
// Provide mappings for clients to interact with Courses.
//---------------------------------------------------------------
@RestController()
@CrossOrigin("*")
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;
    private final Logger logger = LoggerFactory.getLogger(CourseController.class);;

    /**
     * Get a Course by its ID
     * @param id ID of requested Course
     * @return Requested Course
     */
    @GetMapping("/{id}")
    @PreAuthorize(AuthorityConstants.ADMIN_AUTHORITY)
    public ResponseEntity<Course> findById(@PathVariable int id) {
        try {
            logger.info("A Course was requested");
            logger.trace(String.format("Entering findById with parameters (id = %d)", id));

            // Search for attendance log
            Course requestedCourse = courseService.findById(id);
            return ResponseEntity.ok().body(requestedCourse);
        }
        catch (InvalidCourseException e) {
            logger.warn(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Create a new Course. Only accessible to Administrators.
     * Normally would encompass a try-catch block, but no exceptions can be thrown since Courses are very simple
     *
     * @param courseRequest CourseDTO from request body containing the new Course's name
     * @param ucb UriComponentsBuilder injected by Spring-Web to create URI for new object
     * @return Course or appropriate HTTP error from Spring Security
     */
    @PostMapping
    @PreAuthorize(AuthorityConstants.ADMIN_AUTHORITY)
    public ResponseEntity<Course> createCourse(@RequestBody CourseDTO courseRequest, UriComponentsBuilder ucb) {
        Course savedCourse = courseService.createCourse(courseRequest);
        URI locationOfNewCourse = ucb
                .path("/courses/{id}")
                .buildAndExpand(savedCourse.getId())
                .toUri();

        logger.info("A new Course was created");
        logger.trace(String.format("Created Course: %s", savedCourse));
        return ResponseEntity.created(locationOfNewCourse).body(savedCourse);
    }
}
