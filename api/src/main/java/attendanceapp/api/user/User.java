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
@Table(name = "USERS")
public record User(
        @Id
        @Column("ID")
        Integer id,

        @Column("FIRST_NAME")
        String firstName,

        @Column("LAST_NAME")
        String lastName,

        @Column("STUDENT_CARD_ID")
        String studentCardId,

        @Column("USERNAME")
        String username,

        @Column("PASSWORD")
        String password,

        @Column("ROLE_ID")
        int roleId
) {}