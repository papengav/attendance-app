//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Provide a mapping for clients to interact with Sections.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.section;

import attendanceapp.api.auth.AuthorityConstants;
import attendanceapp.api.course.Course;
import attendanceapp.api.exceptions.InvalidCourseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

//---------------------------------------------------------------
// Provide mappings for clients to interact with Sections.
//---------------------------------------------------------------
@RestController
@RequestMapping("/sections")
@CrossOrigin("*")
public class SectionController {

    Logger logger;
    SectionService sectionService;

    /**
     * Construct the Section Controller
     *
     * @param sectionService Section Service
     */
    public SectionController(SectionService sectionService) {
        this.logger = LoggerFactory.getLogger(SectionController.class);
        this.sectionService = sectionService;
    }

    /**
     * Get a Section by its ID
     *
     * @param id ID of requested Section
     * @return requested Section
     */
    @GetMapping("/{id}")
    @PreAuthorize(AuthorityConstants.ADMIN_AUTHORITY)
    public ResponseEntity<Section> findById(@PathVariable int id) {
        try {
            logger.info("A Section was requested");
            logger.trace(String.format("Entering findById with parameters (id = %d)", id));

            // Search for attendance log
            Section requestedSection = sectionService.findById(id);
            return ResponseEntity.ok().body(requestedSection);
        }
        catch (InvalidCourseException e) {
            logger.warn(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Create a new Section. Accessible only to Administrators.
     *
     * @param sectionRequest SectionDTO in request body containing data for new Section.
     * @param ucb UriComponentsBuilder injected by Spring-Web to create URI for new Section
     * @return new Section
     */
    @PostMapping
    @PreAuthorize(AuthorityConstants.ADMIN_AUTHORITY)
    public ResponseEntity<Section> createSection(@RequestBody SectionDTO sectionRequest, UriComponentsBuilder ucb) {
        try {
            Section savedSection = sectionService.createSection(sectionRequest);

            URI locationOfNewSection = ucb
                    .path("/sections/{id}")
                    .buildAndExpand(savedSection.id())
                    .toUri();

            logger.info("A new Section was created");
            logger.trace(String.format("Created Section: %s", savedSection));
            return ResponseEntity.created(locationOfNewSection).body(savedSection);
        }
        catch (InvalidCourseException e) {
            logger.warn("Invalid Request: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

}
