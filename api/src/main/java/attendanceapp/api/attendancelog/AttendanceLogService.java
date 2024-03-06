//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Service layer to handle AttendanceLogDTO validation and AttendanceLog construction.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.attendancelog;

import attendanceapp.api.exceptions.InvalidCredentialsException;
import attendanceapp.api.exceptions.InvalidEnrollmentException;
import attendanceapp.api.enrollment.Enrollment;
import attendanceapp.api.enrollment.EnrollmentRepository;
import attendanceapp.api.meetingtime.MeetingTime;
import attendanceapp.api.meetingtime.MeetingTimeRepository;
import attendanceapp.api.section.Section;
import attendanceapp.api.section.SectionRepository;
import attendanceapp.api.user.User;
import attendanceapp.api.user.UserRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalTime;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

//---------------------------------------------------------------
// Provide services for AttendanceLogDTO validation and AttendanceLog construction.
//---------------------------------------------------------------
@Service
public class AttendanceLogService {

    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final AttendanceLogRepository attendanceLogRepository;
    private final MeetingTimeRepository meetingTimeRepository;
    private final SectionRepository sectionRepository;

    /**
     * Construct the AttendanceLogService
     *
     * @param attendanceLogRepository AttendanceLogRepository containing AttendanceLog objects
     * @param userRepository UserRepository containing User objects
     * @param enrollmentRepository EnrollmentRepository containing Enrollment objects
     */
    public AttendanceLogService(AttendanceLogRepository attendanceLogRepository, UserRepository userRepository, EnrollmentRepository enrollmentRepository, MeetingTimeRepository meetingTimeRepository, SectionRepository sectionRepository) {
        this.attendanceLogRepository = attendanceLogRepository;
        this.userRepository = userRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.meetingTimeRepository = meetingTimeRepository;
        this.sectionRepository = sectionRepository;
    }

    /**
     * Validate and create an AttendanceLog
     *
     * @param logRequest AttendanceLogDTO containing studentId and roomNum for request
     * @return AttendanceLog if it was created
     * @throws InvalidCredentialsException No User associated with studentCardId
     * @throws InvalidEnrollmentException No Enrollment for User at given roomNum and Timestamp
     */
    public AttendanceLog createAttendanceLog(AttendanceLogDTO logRequest) throws InvalidCredentialsException, InvalidEnrollmentException {
        Timestamp timestamp = Timestamp.from(Instant.now());
        int roomNum = logRequest.roomNum();
        User student = getUserByStudentCardId(logRequest.studentCardId());

        // Get list of student Enrollments
        List<Enrollment> enrollments = getStudentEnrollments(student);

        // See if any Enrollments have a MeetingTime at the current date & time
        MeetingTime meetingTime = findMatchingMeetingTime(enrollments, timestamp);

        // Check if MeetingTime matches requested roomNum
        Section section = getSectionByMeetingTimeAndRoomNum(meetingTime, roomNum);
        
        // Create and return AttendanceLog
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
     * Find all Enrollments for a User
     *
     * @param student User to search for associated Enrollments
     * @return List<Enrollment> entries if the User has Enrollments
     * @throws InvalidEnrollmentException if the User is not enrolled in any Sections
     */
    private List<Enrollment> getStudentEnrollments(User student) throws InvalidEnrollmentException {
        int studentId = student.id();
        List<Enrollment> enrollments = enrollmentRepository.findAllByStudentId(studentId);

        if (enrollments.isEmpty()) {
            throw new InvalidEnrollmentException("No Enrollments exist for this User");
        }

        return enrollments;
    }

    /**
     * Find a MeetingTime that is in session at the same time as the request, or starts within 10 minutes of the request
     *
     * @param enrollments List<Enrollment> to compare the timestamp to
     * @param timestamp Timestamp to compare the enrollment MeetingTimes to
     * @return MeetingTime if found
     */
    private MeetingTime findMatchingMeetingTime(List<Enrollment> enrollments, Timestamp timestamp) {
        // Extract day and time data from timestamp
        long timeMillis = timestamp.getTime();
        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(timeMillis);
        int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
        LocalTime time = LocalTime.of(cal.get(Calendar.HOUR_OF_DAY), cal.get(Calendar.MINUTE), cal.get(Calendar.SECOND));

        // Get list of MeetingTime for each enrollment
        for (Enrollment enrollment : enrollments) {
            List<MeetingTime> meetingTimes = meetingTimeRepository.findAllBySectionId(enrollment.sectionId());

            // Check if any MeetingTime time-frame fits current time
            for (MeetingTime meetingTime : meetingTimes) {
                LocalTime startTime = meetingTime.startTime().toLocalTime();
                LocalTime endTime = meetingTime.endTime().toLocalTime();

                if (meetingTime.dayOfWeek() == dayOfWeek &&                             // day of week matches
                    ((startTime.isBefore(time) && endTime.isAfter(time)) ||             // and within session
                    (startTime.minusMinutes(10).isBefore(time)))) {     // or within 10 min of session start
                    return meetingTime;
                }
            }
        }

        throw new InvalidEnrollmentException("User is not Enrolled in any Sections at this time");
    }

    /**
     * Find a Section associated with a MeetingTime and roomNum
     *
     * @param meetingTime MeetingTime data of when the Section meets
     * @param roomNum int number of the room the section meets in
     * @return Section if found
     */
    private Section getSectionByMeetingTimeAndRoomNum(MeetingTime meetingTime, int roomNum) {
        int sectionId = meetingTime.sectionId();
        Optional<Section> section = sectionRepository.findById(sectionId);

        if (section.isEmpty()) {
            throw new InvalidEnrollmentException("User is somehow enrolled in a Section that doesn't exist");
        }

        Section validSection = section.get();

        if (validSection.roomNum() != roomNum) {
            throw new InvalidEnrollmentException("User is enrolled in a Section at this time but roomNum does not match");
        }

        return validSection;
    }
}
