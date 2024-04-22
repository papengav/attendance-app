//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and management software
//Purpose: Frontend page for users to create courses.
import React, { useState, useEffect } from 'react';
import './CreateCourse.css';
import Cookies from 'js-cookie';
import '../../Components/Styles/GruvboxTheme.css';

const CreateCourse = () => {
    const [name, setName] = useState('');
    const [jwt, setJwt] = useState('');

    useEffect(() => {
        const jwtToken = Cookies.get('jwt_authorization');
        console.log('JWT:', jwtToken);
        setJwt(jwtToken);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const course = { name };
        console.log('Submitting course:', course);

        fetch('http://localhost:8080/courses', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            },
            body: JSON.stringify(course)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create course');
            }
            return response.json();
        })
        .then(data => {
            console.log('Course created:', data);
            alert('Course Created Successfully');
        })
        .catch(error => {
            console.error('Failed to create course:', error);
            alert('Failed to create course: ' + error.message);
        });
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Create Course</h1>
                <div className='input-box'>
                    <h2>Course Name</h2>
                    <input 
                        type='text'
                        placeholder='Ex: Algebra'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default CreateCourse;
