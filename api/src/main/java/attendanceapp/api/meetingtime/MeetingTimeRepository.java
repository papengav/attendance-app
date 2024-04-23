//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Provide an interface that allows MeetingTimes to be queried to and from the database.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.meetingtime;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

//----------------------------------------------------------------------------------------------
// An interface that allows MeetingTimes to be queried to and from the database.
//----------------------------------------------------------------------------------------------
public interface MeetingTimeRepository extends CrudRepository<MeetingTime, Integer> {

    /**
     * Custom query to find all MeetingTimes associated with sectionId
     *
     * @param sectionId int id of section in requested MeetingTimes
     * @return List<MeetingTime> that contain sectionId
     */
    List<MeetingTime> findAllBySectionId(int sectionId);

}
