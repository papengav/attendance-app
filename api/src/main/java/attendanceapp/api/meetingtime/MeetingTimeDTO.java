//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Create an entity to represent the version of MeetingsTimes used for data transfer to the controller from clients.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.meetingtime;

//----------------------------------------------------------------------------------------------
// An entity to represent the version of MeetingTimes used for data transfer to the controller from clients.
//----------------------------------------------------------------------------------------------
public record MeetingTimeDTO(
   int sectionId,
   int dayOfWeek,

   // Times in hh:mm format
   String startTime,
   String endTime
) {}
