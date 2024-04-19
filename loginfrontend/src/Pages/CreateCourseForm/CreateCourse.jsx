// //Name: Sam Miller
// //Project: Attendance App - This is a full stack attendance tracking and managament software
// //Purpose: Frontend page for users to create couses.
import React, { useState, useEffect } from 'react';
import './CreateCourse.css';
import Cookies from 'js-cookie';

const CreateCourse= () => {
    const [name, setName] = useState()
    const [jwt, setJwt] = useState()



    //Used by each handleClick method to get the jwt out of the cookies
    function useFetchJWT() {
        useEffect(() => {
            const jwt1 = Cookies.get('jwt_authorization');
            console.log('JWT: ', jwt1);
            setJwt(jwt1)
        }, []);
    }


    //Method used when user submits course data to create a course
    function useHandleClickC() {
        useFetchJWT();

        const handleClickC = (e) => {
            e.preventDefault();
            const course = {name}
            console.log(course);
            console.log(JSON.stringify(name));
            const postArgs = {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept-Encoding": "gzip, deflate, br", "Connection": "keep-alive", "Authorization": "Bearer "+ jwt},
                body: JSON.stringify(course)
            };
            fetch('http://localhost:8080/courses', postArgs).then((response) => {
                console.log("Course created");
                return response.json();
            })
            .then(data => {
                console.log("course name: ", name);
                alert('Course Created')
            });
        };

        return handleClickC;
    }
    const handleClickC = useHandleClickC();

    return(

        <div className='wrapper'>
            <form onSubmit={handleClickC}>
                <h1>Create Course</h1>
                <div className='input-box'>
                    <h2>Course Name</h2>
                    <input 
                    type = 'text'
                    placeholder='Ex: Algebra'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                </div>
                <button type='submit'>Submit</button>
                <button type="button" onClick={() => window.history.back()} style={{ marginTop: "10px" }}>Back</button>
            </form>
        </div>
    );
}
export default CreateCourse;
