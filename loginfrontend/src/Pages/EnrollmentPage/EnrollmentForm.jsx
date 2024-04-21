//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Frontend page for Admins to create enrollments for Students.
import React, { useState, useEffect } from 'react';
import './EnrollmentForm.css';
import Cookies from 'js-cookie';

const EnrollmentForm = () => {
    const [sectionId, setSectionId] = useState()
    const [studetnId, setStudentId] = useState()
    const [jwt, setJwt_token] = useState()

    //Used by each handleClick method to get the jwt out of the cookies
    function useFetchJWT() {
        useEffect(() => {
            const jwt_tokenT = Cookies.get('jwt_authorization');
            console.log('JWT Token: ', jwt_tokenT);
            setJwt_token(jwt_tokenT)
        }, []);
    }

    //Method used when user submits course data to create an enrollment
    function useHandleClick() {
        useFetchJWT();

        const handleClick = (e) => {
            e.preventDefault();
            const enrollmentPost = {sectionId, studetnId}
            console.log("Post list: ", enrollmentPost)
            const postArgs = {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept-Encoding": "gzip, deflate, br", "Connection": "keep-alive", "Authorization": "Bearer "+ jwt},
                body: JSON.stringify(enrollmentPost)
            };
            fetch('http://localhost:8080/enrollments', postArgs).then((response) => {
                console.log("Enrollment created");
                return response.json();
            })
            .then(data => {
                const sectionID = data.id; 
                console.log("meeting time ID: ", sectionID);
                alert('Enrollment Created')
            });
        };

        return handleClick;
    }
    return (

        <div className='wrapper'>
            <form onSubmit={useHandleClick}>
                <h1>Create Enrollment</h1>
                <div className='input-box'>
                    <h2>Section</h2>
                    <input 
                    type = 'text'
                    placeholder='ex: 12'
                    value ={sectionId}
                    onChange= {(e) => setSectionId(e.target.value)}
                    required
                    />
                </div>
                <div className='input-box'>
                    <h2>Student ID</h2>
                    <input
                    type = 'text'
                    placeholder='ex: a1b2c3d4'
                    value = {studetnId}
                    onChange= {(e) => setStudentId(e.target.value)}
                    required
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );

}
export default EnrollmentForm;