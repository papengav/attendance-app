//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Frontend page that is currently just a skeleton home page to handle routing

import './HomePage.css';
import '../../Components/Styles/GruvboxTheme.css';
import Cookies from 'js-cookie';

//displays the UI hompage
const HomePage = () => {

    //Method used when user clicks on the create user button
    const handleClickCreateUser = (e) => {
        window.location.href = "/createUser";
    };

    //Method used when the user clicks the create course button
    const handleClickCreateCourse = (e) => {
        window.location.href = "/createCourse";
    };

    //Method used when the user clicks the view users button
    const handleClickViewUsers = (e) => {
      window.location.href = "/viewUsers";
    };

    //Method used when the user clicks the signout button
    const handleClickSignOut = (e) => {
      Cookies.remove("jwt_authorization");
      window.location.href = "/login";
    };

    return (
        <div className="body">
          <div className="top-bar" style={{ backgroundColor: '#fe8019', height: '20px' }}></div>
    
          <div className="main-content">
            <div className="sidebar" style={{ backgroundColor: '#282828', width: '172px' }}>
              <div className="sidebar-bottom" style={{ backgroundColor: '#282828' }}>
                <button className="signoutButton" onClick={handleClickSignOut}>Sign Out</button>
              </div>
            </div>
            <div className="center-content" style={{ backgroundColor: '#3c3836', padding: '10px' }}>
              <div className="grid" style={{ maxWidth: '3000px', margin: 'auto' }}>
                <button className="button" onClick={handleClickCreateUser}>Create User</button>
                <button className="button" onClick={handleClickCreateCourse}>Create Course</button>
                <button className="button" onClick={handleClickViewUsers}>View Users</button>
                <button className="button">View Courses</button>
                <button className="button">View Attendance Logs</button>
                <button className="button">Create Enrollment</button>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default HomePage;