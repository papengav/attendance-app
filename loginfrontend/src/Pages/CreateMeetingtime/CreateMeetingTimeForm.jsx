//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Frontend page for users to create sections.
import React, { useState, useEffect } from 'react';
import './CreateMeetingTime.css';
import Cookies from 'js-cookie';

const CreateMeetingTime = () => {
    
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [dayOfWeek, setDayOfWeek] = useState()
    const [sectionId, setSectionID] = useState()
    const [jwt_token, setJwt_token] = useState()

    //Used by each handleClick method to get the jwt out of the cookies
    function useFetchJWT() {
        useEffect(() => {
            const jwt_tokenT = Cookies.get('jwt_authorization');
            console.log('JWT Token: ', jwt_tokenT);
            setJwt_token(jwt_tokenT)
        }, []);
    }

    //Method used when user submits meeting time data to create a meeting time
    function useHandleClickM() {
        useFetchJWT();

        const handleClickM = (e) => {
            e.preventDefault();
            const meetingTime = {startTime, endTime, dayOfWeek, sectionId}
            console.log(meetingTime);
            const postArgs = {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept-Encoding": "gzip, deflate, br", "Connection": "keep-alive", "Authorization": "Bearer "+ jwt_token},
                body: JSON.stringify(meetingTime)
            };
            fetch('http://localhost:8080/meetingtimes', postArgs).then(() => {
                console.log("Meeting Time created");
                alert('Meeting Time Created')
            });
        };

        return handleClickM;
    }
    const handleClickM = useHandleClickM();
    return (
        <div className='wrapper'>
            <form onSubmit={handleClickM}>
                <h1>Create Meeting Time</h1>
                <div className='input-box'>
                    <h2>Start time</h2>
                    <input
                    type= "time"
                    placeholder='Ex: 1:00 pm'
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                    />
                </div>
                <div className='input-box'>
                    <h2>End Time</h2>
                    <input
                    type = "time"
                    placeholder='Ex: 1:50 pm'
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                    />
                </div>
                <div className='input-box'>
                    <h2>Day of the Week</h2>
                    <input
                    type= "number"
                    placeholder='Ex: Monday'
                    value={dayOfWeek}
                    onChange={(e) => setDayOfWeek(e.target.value)}
                    required
                    />
                </div>
                <button type='submit'>Submit</button>
                <button type="button" onClick={() => window.history.back()} style={{ marginTop: "10px" }}>Back</button>
                </form>
        </div>  
    );

}
export default CreateMeetingTime;