//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Provide a mapping for clients to interact with Sections.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.section;

import attendanceapp.api.auth.AuthorityConstants;
import attendanceapp.api.exceptions.InvalidCourseException;
import attendanceapp.api.exceptions.InvalidUserException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

//---------------------------------------------------------------
// Provide mappings for clients to interact with Sections.
//---------------------------------------------------------------
@RestController
@RequestMapping("/sections")
@CrossOrigin("*")
@RequiredArgsConstructor
public class SectionController {

    private final Logger logger = LoggerFactory.getLogger(SectionController.class);;
    private final SectionService sectionService;

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
     * Get a Page from all existing Sections represented as List
     * Default page = 0
     * Default size = 100
     *
     * @param pageable Pageable object containing page number, size and Sorting rule
     * @return List of Sections within the Page
     */
    @GetMapping
    @PreAuthorize(AuthorityConstants.ADMIN_AUTHORITY)
    public ResponseEntity<List<Section>> findAll(@PageableDefault(size = 100) Pageable pageable) {
        Page<Section> page = sectionService.findAll(pageable);
        return ResponseEntity.ok(page.getContent());
    }

    @GetMapping("by-courseId")
    @PreAuthorize(AuthorityConstants.ADMIN_AUTHORITY)
    public ResponseEntity<List<Section>> findAllByCourseId(@PageableDefault(size = 100) Pageable pageable, @RequestParam int courseId) {
        try {
            Page<Section> page = sectionService.findAllByCourseId(courseId, pageable);
            return ResponseEntity.ok(page.getContent());
        }
        catch (InvalidCourseException e) {
            logger.warn("Invalid Request: " + e.getMessage());
            return ResponseEntity.badRequest().build();
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
                    .buildAndExpand(savedSection.getId())
                    .toUri();

            logger.info("A new Section was created");
            logger.trace(String.format("Created Section: %s", savedSection));
            return ResponseEntity.created(locationOfNewSection).body(savedSection);
        }
        catch (InvalidCourseException | InvalidUserException e) {
            logger.warn("Invalid Request: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
