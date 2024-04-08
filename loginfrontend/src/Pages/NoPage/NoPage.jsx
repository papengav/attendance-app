//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Frontend page for handling path errors
import './NoPage.css'

//displays the page not found error 
export default function NoPage () {
    return(
        <div className='NoPage'>
            <div className='bg'>
            <h2>Error 404: Not Found</h2>
            </div>
        </div>
    )
}