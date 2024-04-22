//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and management software
//Purpose: Frontend page for users to create meeting times.
import React, { useState, useEffect } from 'react';
import './CreateMeetingTime.css';
import Cookies from 'js-cookie';

const CreateMeetingTime = () => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [sectionId, setSectionID] = useState('');
    const [jwtToken, setJwtToken] = useState('');

    useEffect(() => {
        const jwt = Cookies.get('jwt_authorization');
        setJwtToken(jwt);
        console.log('JWT Token:', jwt);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const meetingTime = { startTime, endTime, dayOfWeek, sectionId };
        console.log('Submitting meeting time:', meetingTime);

        fetch('http://localhost:8080/meetingtimes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwtToken
            },
            body: JSON.stringify(meetingTime)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create meeting time');
            }
            return response.json();
        })
        .then(data => {
            console.log('Meeting Time created:', data);
            alert('Meeting Time Created Successfully');
        })
        .catch(error => {
            console.error('Failed to create meeting time:', error);
            alert('Failed to create meeting time: ' + error.message);
        });
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Create Meeting Time</h1>
                <div className='input-box'>
                    <h2>Start Time</h2>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>
                <div className='input-box'>
                    <h2>End Time</h2>
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </div>
                <div className='input-box'>
                    <h2>Day of the Week</h2>
                    <input
                        type="text"
                        placeholder="Ex: Monday"
                        value={dayOfWeek}
                        onChange={(e) => setDayOfWeek(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default CreateMeetingTime;