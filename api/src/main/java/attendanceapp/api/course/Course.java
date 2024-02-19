//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Create an entity to represent Courses from the database.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.course;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

//----------------------------------------------------------------------------------------------
// An entity that represents Courses from the database.
//----------------------------------------------------------------------------------------------
@Table("COURSES")
record Course(
        @Id
        @Column("ID")
        Integer id,

        @Column("NAME")
        String name,

        @Column("SECTION_COUNT")
        Integer sectionCount
) {}
