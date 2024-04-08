//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Generalized context to handle specific exceptions.
//----------------------------------------------------------------------------------------------

// THIS SHOULD BE DELETED IF THE PROGRAM IS EVER DEPLOYED!!!

package attendanceapp.api.config;

import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

//---------------------------------------------------------------
// Generalized context to handle specific exceptions.
//---------------------------------------------------------------
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Intercept NullPointerExceptions and return the error message to the caller
     *
     * @param e Exception
     * @return ResponseEntity with BAD_REQUEST and exception message
     */
    // This seems like a wonderful way to expose business logic to potential threat actors
    // But my teammates want it for help debugging the front-end applications
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<Object> handleNullPointerException(NullPointerException e) {
        LoggerFactory.getLogger(GlobalExceptionHandler.class).warn(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}
