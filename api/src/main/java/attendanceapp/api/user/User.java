//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Create an entity to represent Users from the database.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.user;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

//----------------------------------------------------------------------------------------------
// An entity that represents Users from the database.
//----------------------------------------------------------------------------------------------
@Table(name = "users", schema = "se3330")
public record User(
        @Id
        Integer id,

        @Column("first_name")
        String firstName,

        @Column("last_name")
        String lastName,

        @Column("student_card_id")
        String studentCardId,

        @Column("username")
        String username,

        @Column("password")
        String password,

        @Column("role_id")
        int roleId
) {}