//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Service layer to handle AttendanceLogDTO validation and AttendanceLog construction.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.attendancelog;

import attendanceapp.api.attendancelog.exceptions.InvalidCredentialsException;
import attendanceapp.api.attendancelog.exceptions.InvalidEnrollmentException;
import attendanceapp.api.enrollment.Enrollment;
import attendanceapp.api.enrollment.EnrollmentRepository;
import attendanceapp.api.section.Section;
import attendanceapp.api.section.SectionRepository;
import attendanceapp.api.user.User;
import attendanceapp.api.user.UserRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Optional;

//---------------------------------------------------------------
// Provide services for AttendanceLogDTO validation and AttendanceLog construction.
//---------------------------------------------------------------
@Service
public class AttendanceLogService {

    private final UserRepository userRepository;
    private final SectionRepository sectionRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final AttendanceLogRepository attendanceLogRepository;

    /**
     * Construct the AttendanceLogService
     *
     * @param attendanceLogRepository AttendanceLogRepository containing AttendanceLog objects
     * @param userRepository UserRepository containing User objects
     * @param sectionRepository SectionRepository containing Section objects
     * @param enrollmentRepository EnrollmentRepository containing Enrollment objects
     */
    public AttendanceLogService(AttendanceLogRepository attendanceLogRepository, UserRepository userRepository, SectionRepository sectionRepository, EnrollmentRepository enrollmentRepository) {
        this.attendanceLogRepository = attendanceLogRepository;
        this.userRepository = userRepository;
        this.sectionRepository = sectionRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    public AttendanceLog createAttendanceLog(AttendanceLogDTO logRequest) throws InvalidCredentialsException, InvalidEnrollmentException {
        User student = getUserByStudentCardId(logRequest.studentCardId());
        Section section = getSectionById(logRequest.sectionId());
        Enrollment enrollment = getEnrollment(student.id(), section.id());  // Not used but handles getting the exception

        Timestamp timestamp = Timestamp.from(Instant.now());
        AttendanceLog newLog = new AttendanceLog(null, student.id(), section.id(), timestamp, null);
        return attendanceLogRepository.save(newLog);
    }

    /**
     * Find a User by their studentCardId
     *
     * @param studentCardId studentCardId of the request student
     * @return User if they exist
     * @throws InvalidCredentialsException if the studentCardId isn't associated with a User
     */
    private User getUserByStudentCardId(String studentCardId) throws InvalidCredentialsException {
        Optional<User> userOptional = userRepository.findByStudentCardId(studentCardId);

        if (userOptional.isEmpty()) {
            throw new InvalidCredentialsException("Invalid studentCardId");
        }
        return userOptional.get();
    }

    /**
     * Find a Section by its ID
     *
     * @param sectionId ID of the requested Section
     * @return Section if it exists
     * @throws InvalidCredentialsException if the sectionId isn't associated with a Section
     */
    private Section getSectionById(int sectionId) throws InvalidCredentialsException {
        Optional<Section> sectionOptional = sectionRepository.findById(sectionId);

        if (sectionOptional.isEmpty()) {
            throw new InvalidCredentialsException("Invalid sectionId");
        }
        return sectionOptional.get();
    }

    /**
     * Find an Enrollment by studentId and sectionId
     * Should only be called after verifying the studentId and sectionId
     *
     * @param studentId ID of the enrolled User
     * @param sectionId ID of the Section
     * @return Enrollment entry if the User is enrolled in the Section
     * @throws InvalidEnrollmentException if the User is not enrolled in the Section
     */
    private Enrollment getEnrollment(int studentId, int sectionId) throws InvalidEnrollmentException {
        Optional<Enrollment> enrollmentOptional = enrollmentRepository.findByStudentIdAndSectionId(studentId, sectionId);

        if (enrollmentOptional.isEmpty()) {
            throw new InvalidEnrollmentException("No enrollment exists for student in the section");
        }
        return enrollmentOptional.get();
    }

}
