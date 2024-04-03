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
@Table(name = "sections", schema = "#{@environment.getProperty('attendanceapp.schema')}")
public record Section(
    @Id
    @Column("id")
    Integer id,

    @Column("room_num")
    int roomNum,

    @Column("num_students")
    Integer numStudents,

    @Column("course_id")
    int courseId
) {}
