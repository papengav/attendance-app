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
    const [professors, setProfessors] = useState([]);
    const [sections, setSections] = useState([]);


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
                alert('Section Created')
            });
        };

        return handleClickS;
    }
<<<<<<< HEAD
    const handleClickS = useHandleClickS();
=======

    const handleClickS = useHandleClickS();


    const useFetchProfessors = (professorIds) => {
        const [professors, setProfessors] = useState([]);
    
        useEffect(() => {
            const jwtToken = Cookies.get('jwt_authorization');
    
            if (jwtToken && professorIds.length) {
                fetch(`http://localhost:8080/users/by-roleId`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({ ids: professorIds })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Professors data:', data);
                    setProfessors(data);
                })
                .catch(error => {
                    console.error('Failed to fetch professors:', error);
                });
            }
        }, [professorIds]);
    
        return professors;
    }
>>>>>>> e46ec61ec8702b0a776b07f743214ca3074bf5ce


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