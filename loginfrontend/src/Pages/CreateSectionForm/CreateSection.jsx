//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Frontend page for users to create sections.
import React, { useState, useEffect } from 'react';
import './CreateSection.css';
import Cookies from 'js-cookie';

const CreateSection = () => {
    const [roomNum, setRoomNumber] = useState()
    const [professorId, setProfessorId] = useState()
    const [numberOfStudent, setNumStudents] = useState()
    const [courseId, setCourseID] = useState()
    const [jwt_token, setJwt_token] = useState()

    //Used by each handleClick method to get the jwt out of the cookies
    function useFetchJWT() {
        useEffect(() => {
            const jwt_tokenT = Cookies.get('jwt_authorization');
            console.log('JWT Token: ', jwt_tokenT);
            setJwt_token(jwt_tokenT)
        }, []);
    }

    //Method used when user submits section data to create a section
    function useHandleClickS() {
        useFetchJWT();

        const handleClickS = (e) => {
            e.preventDefault();
            const section = {roomNum, numberOfStudent, courseId}
            console.log(section);
            console.log("Stringified: ", JSON.stringify(section))
            const postArgs = {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept-Encoding": "gzip, deflate, br", "Connection": "keep-alive", "Authorization": "Bearer "+ jwt_token},
                body: JSON.stringify(section)
            };
            fetch('http://localhost:8080/sections', postArgs).then((response) => {
                console.log("Section created");
                return response.json()
            })
            .then(data => {
                const sectionID = data.id; 
                console.log("Section ID: ",sectionID);
                setSectionID(sectionID);
                alert('Section Created')
            });
        };

        return handleClickS;
    }
    const handleClickS = useHandleClickS();


    return (
        <div className='wrapper'>
            <form onSubmit={handleClickS}>
                <h1>Create Section</h1>
                <div className='input-box'>
                    <h2>Input Room Number</h2>
                    <input
                    type= "text"
                    placeholder='001A'
                    value={roomNum}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    required
                    />
                </div>
                <div className='input-box'>
                    <h2>Input Number of Students</h2>
                    <input
                    type= "number"
                    placeholder='1'
                    value={numberOfStudent}
                    onChange={(e) => setNumStudents(e.target.value)}
                    required
                    />
                </div>
                <button type='submit'>Submit</button>
                <button type="button" onClick={() => window.history.back()} style={{ marginTop: "10px" }}>Back</button>
            </form>
        </div>
    );
};

export default CreateSection;