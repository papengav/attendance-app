//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Frontend page for users to create sections.
import React, { useState, useEffect } from 'react';
import './CreateSection.css';
import Cookies from 'js-cookie';

const CreateSection = () => {
    const [roomNumber, setRoomNumber] = useState()
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [numStudents, setNumStudents] = useState()
    // const changeRoomNumber = event => {
    //     setRoomNumber(event.target.value)
    // }
    // const changeStartTime = event => {
    //     setStartTime(event.target.value)
    // }
    // const changeEndTime = event => {
    //     setEndTime(event.target.value)
    // }
    // const changeNumStudents = event => {
    //     setNumStudents(event.target.value)
    // }
    const handleClick = (e) => {
        e.preventDefault();
        const section = {roomNumber, startTime, endTime, numStudents}
        console.log(section);
        useEffect(() => {
            // Retrieve JWT token from the cookie
            const jwt_token = Cookies.get('jwt_authorization');
            console.log('JWT Token: ', jwt_token);
          }, []);
        const postArgs = {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "*/*", "Accept-Encoding": "gzip, deflate, br", "Connection": "keep-alive", "Authorization": "bearer "+{jwt_token}},
            body: JSON.stringify(section)
        };
        fetch('http://localhost:8080/createSection', postArgs).then(() => {
            console.log("Section created");
        });
    };

    return (
        //missing choosing meeting dates
        //try to make it so user can select days of the week
        <div className='wrapper'>
            <form onSubmit={handleClick}>
                <h1>Create Section</h1>
                <div className='input-box'>
                    <h2>Input Room Number</h2>
                    <input
                    type= "text"
                    placeholder='001A'
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    required
                    />
                </div>
                <div className='input-box'>
                    <h2>Input Start time</h2>
                    <input
                    type= "time"
                    placeholder='1:00 pm'
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                    />
                </div>
                <div className='input-box'>
                    <h2>Input End Time</h2>
                    <input
                    type = "time"
                    placeholder='1:50 pm'
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                    />
                </div>
                <div className='input-box'>
                    <h2>Input Number of Students</h2>
                    <input
                    type= "number"
                    placeholder='1'
                    value={numStudents}
                    onChange={(e) => setNumStudents(e.target.value)}
                    required
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>

        //This is the old implementation pre-styling

        // <div className='d-flex justify-content-center mt-5'>
        //     <div className='w-50 p-3 border rounded'>
        //         <h4>Input Section Room Number</h4>
        //         <input onChange={changeRoomNumber} value= {roomNumber}/>
        //     </div>
        //     <div className='w-50 p-3 border rounded'>
        //         <h4>Input Section Start Time</h4>
        //         <input onChange={changeStartTime} value = {startTime}/>
        //     </div>
        //     <div className='w-50 p-3 border rounded'>
        //         <h4>Input Section End Time</h4>
        //         <input onChange={changeEndTime} value = {endTime}/>
        //     </div>
        //     <div className='w-50 p-3 border rounded'>
        //         <h4>Input Number of Students</h4>
        //         <input onChange={changeNumStudents} value = {numStudents}/>
        //     </div>
        //     <div>
        //         <button onClick={handleClick}>Submit</button>
        //     </div>
        // </div>
    );
};

export default CreateSection;