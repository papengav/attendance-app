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
@Table("MEETING_TIMES")
public record MeetingTime(
        @Id
        @Column("ID")
        Integer id,

        @Column("SECTION_ID")
        int sectionId,

        @Column("DAY_OF_WEEK")
        int dayOfWeek,

        @Column("START_TIME")
        Time startTime,

        @Column("END_TIME")
        Time endTime
) {}
