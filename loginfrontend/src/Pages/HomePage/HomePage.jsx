//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Frontend page that is currently just a skelition home page to handle routing

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
        <div>
            <div>
            <h1>Home Page</h1>
            <div>
            <button onClick={handleClickU}>Create User</button>
            </div>
            <div>
            <button onClick={handleClickC}>Create Course</button>
            </div>
        </div>
        </div>
    );
};
export default HomePage;