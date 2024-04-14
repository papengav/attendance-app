//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Frontend page that is currently just a skeleton home page to handle routing

import './HomePage.css';
import '../../Components/Styles/GruvboxTheme.css';

//displays the UI hompage
const HomePage = () => {

    //Method used when user clicks on the create user button
    const handleClickU = (e) => {
        window.location.href = "/createUser";
    };

    //Method used when the user clicks the create course button
    const handleClickC = (e) => {
        window.location.href = "/createCourse";
    };

    return (
        <div className='wrapper'>
            <div>
            <div>
            <h1>Home Page</h1>
            <div>
            <button type="button" onClick={handleClickU}>Create User</button>
            </div>
            <div>
            <button type="button" onClick={handleClickC}>Create Course</button>
            </div>
        </div>
        </div>
        </div>
    );
};
export default HomePage;