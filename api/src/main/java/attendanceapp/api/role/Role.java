//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Create an entity that represents Roles from the database.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.role;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

//----------------------------------------------------------------------------------------------
// An entity that represents roles from the database.
//----------------------------------------------------------------------------------------------
@Table("ROLES")
record Role(
   @Id
   @Column("ID")
   Integer id,

   @Column("NAME")
   String name
) {}
