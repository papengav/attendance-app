//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Create an entity to represent MeetingTimes from the database.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.meetingtime;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Time;

//----------------------------------------------------------------------------------------------
// An entity that represents MeetingTimes from the database.
//----------------------------------------------------------------------------------------------
@Table(name = "meeting_times", schema = "se3330")
public record MeetingTime(
        @Id
        @Column("id")
        Integer id,

        @Column("section_id")
        int sectionId,

        @Column("day_of_week")
        int dayOfWeek,

        @Column("start_time")
        Time startTime,

        @Column("end_time")
        Time endTime
) {}
