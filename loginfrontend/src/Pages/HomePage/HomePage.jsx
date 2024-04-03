

const HomePage = () => {

const handleClickU = (e) => {
    window.location.href = "/createUser";
};
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