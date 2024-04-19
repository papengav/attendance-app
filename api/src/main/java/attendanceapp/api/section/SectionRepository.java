//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Provide an interface that allows Sections to be queried to and from the database.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.section;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

//----------------------------------------------------------------------------------------------
// An interface that allows sections to be queried to and from the database.
//----------------------------------------------------------------------------------------------
public interface SectionRepository extends CrudRepository<Section, Integer>, PagingAndSortingRepository<Section, Integer> {
}
