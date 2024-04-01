//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Create an entity to represent Users from the database.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

//----------------------------------------------------------------------------------------------
// An entity that represents Users from the database.
//----------------------------------------------------------------------------------------------
@Table(name = "users", schema = "se3330")
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

//----------------------------------------------------------------------------------------------
// UserDetails interface provided by Spring Security to build upon Users for various Auth features
// Javadoc comment only supplied for methods I actually implement
//----------------------------------------------------------------------------------------------
) implements UserDetails {

    /**
     * Get a User's Authorities
     *
     * @return List of User Roles
     */
    @Override
    @JsonIgnore // Prevent Jackson from attempting to deserialize during tests - will always crash tests otherwise
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String strRoleId = String.valueOf(roleId);
        return List.of(new SimpleGrantedAuthority(strRoleId));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    // ------------------------------------------------------------
    // These are all necessary methods for the interface extension
    // However their functionality will not be needed for this application MVP
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    // -------------------------------------------------------------
}