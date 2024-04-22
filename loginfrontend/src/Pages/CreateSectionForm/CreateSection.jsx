//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and management software
//Purpose: Frontend page for users to create sections.
import React, { useState, useEffect } from 'react';
import './CreateSection.css';
import Cookies from 'js-cookie';
import '../../Components/Styles/GruvboxTheme.css';

const CreateSection = () => {
    const [roomNum, setRoomNumber] = useState('');
    const [professorId, setProfessorId] = useState('');
    const [numberOfStudent, setNumStudents] = useState('');
    const [courseId, setCourseId] = useState('');
    const [professors, setProfessors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [jwtToken, setJwtToken] = useState('');

    useEffect(() => {
        const jwt = Cookies.get('jwt_authorization');
        setJwtToken(jwt);
    }, []);

    useEffect(() => {
        if (jwtToken) {
            fetchProfessors();
            fetchCourses();
        }
    }, [jwtToken]);

    const fetchProfessors = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/by-roleId?roleId=2`, {
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
            setProfessors(data || []);
        } catch (error) {
            console.error('Failed to fetch professors:', error);
        }
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const section = { roomNum, numberOfStudent, courseId, professorId };
        
        fetch('http://localhost:8080/sections', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            },
            body: JSON.stringify(section)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create section');
            }
            return response.json();
        })
        .then(() => {
            alert('Section Created Successfully');
        })
        .catch(error => {
            alert('Error creating section: ' + error.message);
        });
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Create Section</h1>
                <div className='input-box'>
                    <h2>Input Room Number</h2>
                    <input type="text" placeholder="001A" value={roomNum} onChange={(e) => setRoomNumber(e.target.value)} required />
                </div>
                <div className='input-box'>
                    <h2>Select Professor</h2>
                    <select value={professorId} onChange={(e) => setProfessorId(e.target.value)} required className="form-select">
                        <option value="">Select a Professor</option>
                        {professors.map((prof) => (
                            <option key={prof.id} value={prof.id}>{prof.firstName} {prof.lastName}</option>
                        ))}
                    </select>
                </div>
                <div className='input-box'>
                    <h2>Select Course</h2>
                    <select value={courseId} onChange={(e) => setCourseId(e.target.value)} required className="form-select">
                        <option value="">Select a Course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>{course.name}</option>
                        ))}
                    </select>
                </div>
                <div className='input-box'>
                    <h2>Input Number of Students</h2>
                    <input type="number" defaultValue="1" min="0" value={numberOfStudent} onChange={(e) => setNumStudents(e.target.value)} required />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default CreateSection;
