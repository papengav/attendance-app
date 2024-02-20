package attendanceapp.api.attendancelog.exceptions;

public class InvalidEnrollmentException extends RuntimeException {

    public InvalidEnrollmentException(String message) {
        super(message);
    }
}
