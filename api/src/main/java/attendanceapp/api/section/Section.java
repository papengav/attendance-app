//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Create an entity that represents Sections from the database.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.section;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;


//----------------------------------------------------------------------------------------------
// An entity that represents Sections from the database.
//----------------------------------------------------------------------------------------------
@Table("SECTIONS")
public record Section(
    @Id
    @Column("ID")
    Integer id,

    @Column("ROOM_NUM")
    int roomNum,

    @Column("NUM_STUDENTS")
    Integer numStudents,

    @Column("COURSE_ID")
    int course_id
) {}
