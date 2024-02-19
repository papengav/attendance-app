//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Create an entity to represent Enrollments from the database.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.enrollment;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

//----------------------------------------------------------------------------------------------
// An entity to represent Enrollments from the database.
//----------------------------------------------------------------------------------------------
@Table("ENROLLMENTS")
public record Enrollment(
   @Id
   @Column("ID")
   Integer id,

   @Column("SECTION_ID")
   int sectionId,

   @Column("STUDENT_ID")
   int studentId
) {}
