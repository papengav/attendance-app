//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Provide a mapping for clients to interact with AttendanceLogs.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.attendancelog;

import attendanceapp.api.exceptions.InvalidCredentialsException;
import attendanceapp.api.exceptions.InvalidEnrollmentException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

//---------------------------------------------------------------
// Provide mappings for clients to interact with AttendanceLogs.
//---------------------------------------------------------------
@RestController
@RequestMapping("/attendancelogs")
class AttendanceLogController {

    private final AttendanceLogService attendanceLogService;
    private final AttendanceLogRepository attendanceLogRepository;

    private final Logger logger;

    /**
     * Construct the AttendanceLogController
     *
     * @param attendanceLogRepository AttendanceLogRepository containing AttendanceLog objects
     */
    private AttendanceLogController(AttendanceLogService attendanceLogService, AttendanceLogRepository attendanceLogRepository) {
        this.attendanceLogService = attendanceLogService;
        logger = LoggerFactory.getLogger(AttendanceLogController.class);
        this.attendanceLogRepository = attendanceLogRepository;
    }

    /**
     * Get an attendance log by id
     *
     * @param requestedId type int id of requested AttendanceLog
     * @return AttendanceLog or 404 NOT FOUND
     */
    @GetMapping("/{requestedId}")
    private ResponseEntity<AttendanceLog> findById(@PathVariable int requestedId) {
        logger.info("An AttendanceLog was requested");
        logger.trace(String.format("Entering findById with parameters (requestedId = %d)", requestedId));

        // Search for attendance log
        Optional<AttendanceLog> logOptional = attendanceLogRepository.findById(requestedId);

        // If attendance log found, return it, else return http not found
        if (logOptional.isPresent()) {
            logger.trace(String.format("Exiting findById with output AttendanceLog = %s", logOptional.get()));
            return ResponseEntity.ok().body(logOptional.get());
        }
        else {
            logger.warn("A client attempted to a request an AttendanceLog that does not exist");
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Create a new AttendanceLog. Intended only to be invoked by classroom microcontrollers when a student's ID card is scanned.
     *
     * @param newLogRequest AttendanceLogDTO from request-body containing studentCardId and sectionId
     * @param ucb UriComponentsBuilder injected by Spring-Web to create URI for new object.
     * @return AttendanceLog or 403 FORBIDDEN or 400 BAD REQUEST
     */
    @PostMapping
    private ResponseEntity<AttendanceLog> createAttendanceLog(@RequestBody AttendanceLogDTO newLogRequest, UriComponentsBuilder ucb) {
        try {
            AttendanceLog savedLog = attendanceLogService.createAttendanceLog(newLogRequest);
            URI locationOfNewLog = ucb
                    .path("attendancelogs/{id}")
                    .buildAndExpand(savedLog.id())
                    .toUri();
            logger.info("A new AttendanceLog was created");
            logger.trace(String.format("Created AttendanceLog: %s", savedLog));
            return ResponseEntity.created(locationOfNewLog).body(savedLog);
        }
        catch (InvalidCredentialsException e) {
            logger.warn("Invalid request: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
        catch (InvalidEnrollmentException e) {
            logger.warn("Invalid Enrollment: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}