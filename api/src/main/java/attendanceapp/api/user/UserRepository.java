//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Provide an interface that allows Users to be queried to and from the database.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.user;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


//----------------------------------------------------------------------------------------------
// An interface that allows Users to be queried to and from the database.
//----------------------------------------------------------------------------------------------
public interface UserRepository extends CrudRepository<User, Integer> {

    /**
     * Custom query to search for students by their card ID in the database.
     *
     * @param studentCardId int card id of the student being requested.
     * @return User student if they exist.
     */
    Optional<User> findByStudentCardId(String studentCardId);
}