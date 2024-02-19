//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Provide a mapping for clients to interact with AttendanceLogs.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.attendancelog;

import attendanceapp.api.enrollment.Enrollment;
import attendanceapp.api.enrollment.EnrollmentRepository;
import attendanceapp.api.section.Section;
import attendanceapp.api.section.SectionRepository;
import attendanceapp.api.user.User;
import attendanceapp.api.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Optional;

//---------------------------------------------------------------
// Provide mappings for clients to interact with AttendanceLogs.
//---------------------------------------------------------------
@RestController
@RequestMapping("/attendancelogs")
class AttendanceLogController {
    private final AttendanceLogRepository attendanceLogRepository;
    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final SectionRepository sectionRepository;

    private final Logger logger;

    /**
     * Construct the AttendanceLogController
     *
     * @param attendanceLogRepository AttendanceLogRepository containing AttendanceLog objects
     * @param userRepository UserRepository containing User objects
     * @param enrollmentRepository EnrollmentRepository containing Enrollment objects
     * @param sectionRepository SectionRepository containing Section objects
     */
    private AttendanceLogController(AttendanceLogRepository attendanceLogRepository, UserRepository userRepository, EnrollmentRepository enrollmentRepository, SectionRepository sectionRepository) {
        logger = LoggerFactory.getLogger(AttendanceLogController.class);
        this.attendanceLogRepository = attendanceLogRepository;
        this.userRepository = userRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.sectionRepository = sectionRepository;
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
        logger.trace(String.format("Entering createAttendanceLog with parameters (newLogRequest = %s", newLogRequest));

        Optional<User> studentOptional = userRepository.findByStudentCardId(newLogRequest.studentCardId());
        int sectionId = newLogRequest.sectionId();
        Optional<Section> sectionOptional = sectionRepository.findById(sectionId);
        Optional<Enrollment> enrollmentOptional;

        if (studentOptional.isPresent() && sectionOptional.isPresent()) {
            logger.trace(String.format("Student %s and Section %s found", studentOptional, sectionOptional));

            int studentId = studentOptional.get().id();
            enrollmentOptional = enrollmentRepository.findByStudentIdAndSectionId(studentId, sectionId);

            if (enrollmentOptional.isPresent()) {
                logger.trace("Confirmed Student is enrolled in Section");

                Timestamp timeStamp = Timestamp.from(Instant.now());
                AttendanceLog newLog = new AttendanceLog(null, studentId, sectionId, timeStamp, null);

                AttendanceLog savedLog = attendanceLogRepository.save(newLog);
                URI locationOfNewLog = ucb
                        .path("attendancelogs/{id}")
                        .buildAndExpand(savedLog.id())
                        .toUri();

                logger.info("A new AttendanceLog was created");
                logger.trace(String.format("Created AttendanceLog: %s", savedLog));
                return ResponseEntity.created(locationOfNewLog).body(savedLog);
            }
            else {
                logger.warn("A client attempted to create an AttendanceLog for a Section they are not enrolled in");
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        }

        logger.warn("A client attempted to create an AttendanceLog with invalid credentials");
        return ResponseEntity.badRequest().build();
    }
}