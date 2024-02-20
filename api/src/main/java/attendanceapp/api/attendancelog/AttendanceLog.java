//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Create an entity to represent Attendance Logs from the database.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.attendancelog;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Timestamp;

//----------------------------------------------------------------------------------------------
// An entity to represent Attendance Logs from the database.
//----------------------------------------------------------------------------------------------
@Table(name = "ATTENDANCE_LOGS")
public record AttendanceLog(
        @Id
        @Column("ID")
        Integer id,

        @Column("STUDENT_ID")
        int studentId,

        @Column("SECTION_ID")
        int sectionId,

        @Column("DATE_TIME")
        Timestamp dateTime,

        @Column("EXCUSED")
        Boolean excused
) {}