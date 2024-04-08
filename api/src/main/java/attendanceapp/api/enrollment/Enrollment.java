//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Create an entity to represent Enrollments from the database.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.enrollment;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

//----------------------------------------------------------------------------------------------
// An entity to represent Enrollments from the database.
//----------------------------------------------------------------------------------------------
@Table(name = "enrollments", schema = "#{@environment.getProperty('attendanceapp.schema')}")
@RequiredArgsConstructor
@Getter
@Setter
public class Enrollment {

   @Id
   @Column("id")
   private Integer id;

   @Column("section_id")
   @NonNull
   int sectionId;

   @Column("student_id")
   @NonNull
   int studentId;
}
