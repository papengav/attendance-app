//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and management software
//Purpose: Frontend page for users to create meeting times.

// Import necessary modules and styles
import React, { useState, useEffect } from 'react';
import './CreateMeetingTime.css'; // CSS for this component
import Cookies from 'js-cookie'; // Library for handling cookies

// Define the CreateMeetingTime component
const CreateMeetingTime = () => {
    // State hooks for storing form data and JWT token
    const [startTime, setStartTime] = useState(''); // State for start time of the meeting
    const [endTime, setEndTime] = useState(''); // State for end time of the meeting
    const [dayOfWeek, setDayOfWeek] = useState(''); // State for selecting the day of the week
    const [sectionId, setSectionId] = useState(''); // State for section ID
    const [jwtToken, setJwtToken] = useState(''); // State for storing the JWT token

    // Options for the day of the week dropdown
    const options = [
        { label: "Monday", value: 2 },
        { label: "Tuesday", value: 3 },
        { label: "Wednesday", value: 4 },
        { label: "Thursday", value: 5 },
        { label: "Friday", value: 6 }, 
        { label: "Saturday", value: 7 },
        { label: "Sunday", value: 1 },
    ];

    // Effect hook to retrieve JWT token from cookies on component mount
    useEffect(() => {
        const jwt = Cookies.get('jwt_authorization'); // Fetch JWT token from cookies
        setJwtToken(jwt); // Set the JWT token state
        console.log('JWT Token:', jwt); // Log JWT token for debugging
    }, []);

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission action
        const meetingTime = { startTime, endTime, dayOfWeek, sectionId }; // Gather form data into an object
        console.log('Submitting meeting time:', meetingTime); // Log the meeting time data for debugging

        // Perform a POST request to create a new meeting time
        fetch('http://localhost:8080/meetingtimes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwtToken // Include JWT token in the Authorization header
            },
            body: JSON.stringify(meetingTime) // Convert meeting time data to JSON string
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create meeting time'); // Handle HTTP errors
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            console.log('Meeting Time created:', data); // Log success message
            alert('Meeting Time Created Successfully'); // Show success alert
        })
        .catch(error => {
            console.error('Failed to create meeting time:', error); // Log errors
            alert('Failed to create meeting time: ' + error.message); // Show error alert
        });
    };

    // JSX to render the form UI
    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Create Meeting Time</h1>
                <div className='input-box'>
                    <h2>Start Time</h2>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)} // Update startTime state on change
                        required
                    />
                </div>
                <div className='input-box'>
                    <h2>End Time</h2>
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)} // Update endTime state on change
                        required
                    />
                </div>
                <div className='input-box'>
                    <h2>Day of the Week</h2>
                    <select onChange={(e) => setDayOfWeek(e.target.value)} className="form-select"> // Dropdown for selecting day of the week
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option> // Map options to dropdown items
                        ))}
                    </select>
                </div>
                <button type='submit'>Submit</button> // Button to submit the form
            </form>
        </div>
    );
};

export default CreateMeetingTime; // Export the component for use in other parts of the application
