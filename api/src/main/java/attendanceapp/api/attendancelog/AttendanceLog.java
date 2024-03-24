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
@Table(name = "attendance_logs")
public record AttendanceLog(
        @Id
        Integer id,

        @Column("student_id")
        int studentId,

        @Column("section_id")
        int sectionId,

        @Column("date_time")
        Timestamp dateTime,

        @Column("excused")
        Boolean excused
) {}