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
    const [studentId, setStudentId] = useState('');
    const [sections, setSections] = useState([]);
    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState('');

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

    // Function to update course ID and fetch sections for that course
    const setNewCourseId = (newCourseId) => {
        setCourseId(newCourseId);
        if (newCourseId) fetchSectionsByCourseId(newCourseId);
    };

    // Fetch JWT from cookies when component mounts
    useEffect(() => {
        const jwtToken = Cookies.get('jwt_authorization');
        setJwtToken(jwtToken);
    }, []);

    // Effect hook to retrieve JWT token from cookies on component mount
    useEffect(() => {
        const jwt = Cookies.get('jwt_authorization'); // Fetch JWT token from cookies
        setJwtToken(jwt); // Set the JWT token state
        console.log('JWT Token:', jwt); // Log JWT token for debugging
    }, []);

    // Fetch students and courses when JWT is available
    useEffect(() => {
        if (jwt) {
            fetchCourses();
        }
    }, [jwt]);

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

    // Async function to fetch courses from backend
    const fetchCourses = async () => {
        try {
            const response = await fetch(`http://localhost:8080/courses`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCourses(data || []);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        }
    };

    // Fetch sections based on selected course
    const fetchSectionsByCourseId = async (courseId) => {
        if (!courseId) return;
    
        const url = new URL('http://localhost:8080/sections/by-courseId');
        url.searchParams.append('courseId', courseId);
    
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSections(data || []);
        } catch (error) {
            console.error('Failed to fetch sections:', error);
        }
    };

    // JSX to render the form UI
    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Create Meeting Time</h1>
                <div className='input-box'>
                    <h2>Select Course</h2>
                    <select value={courseId} onChange={(e) => setNewCourseId(e.target.value)} required className="form-select">
                        <option value="">Select a Course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>{course.name}</option>
                        ))}
                    </select>
                </div>
                <div className='input-box'>
                <h2>Select a Section</h2>
                <select value={sectionId} onChange={(e) => setSectionId(e.target.value)} required className="form-select">
                    <option value="">Select a Section</option>
                    {sections.map((section) => (
                        <option key={section.id} value={section.id}>{section.roomNum}</option>
                    ))}
                </select>
                </div>
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
                    <select onChange={(e) => setDayOfWeek(e.target.value)} className="form-select">
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option> // Map options to dropdown items
                        ))}
                    </select>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default CreateMeetingTime; // Export the component for use in other parts of the application
