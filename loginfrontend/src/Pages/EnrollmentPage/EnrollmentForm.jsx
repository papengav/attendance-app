//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Frontend page for Admins to create enrollments for Students.
import React, { useState, useEffect } from 'react';
import './EnrollmentForm.css';
import Cookies from 'js-cookie';

const EnrollmentForm = () => {
    const [studentId, setStudentId] = useState()
    const [students, setStudents] = useState([])
    const [sectionId, setSectionId] = useState()
    const [sections, setSections] = useState([])
    const [courses, setCourses] = useState([])
    const [jwt, setJwtToken] = useState('')
    const [courseId, setCourseId] = useState('')

    const setNewCourseId = (newCourseId) => {
        setCourseId(newCourseId);
        if (newCourseId) fetchSectionsByCourseId(newCourseId);
    }
    
    useEffect(() => {
        const jwtToken = Cookies.get('jwt_authorization');
        setJwtToken(jwtToken);
    }, []);

    useEffect(() => {
        if (jwt) {
            fetchStudents();
            fetchCourses();
        }
    }, [jwt]);

    const fetchStudents = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/by-roleId?roleId=3`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setStudents(data || []);
        } catch (error) {
            console.error('Failed to fetch students:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await fetch(`http://localhost:8080/courses`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
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

    const fetchSectionsByCourseId = async (courseId) => {
        if (!courseId) return;
    
        const url = new URL('http://localhost:8080/sections/by-courseId');
        url.searchParams.append('courseId', courseId);
        url.searchParams.append('page', 0);
        url.searchParams.append('size', 100);
    
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Sections data:', data);
            setSections(data || []);
        } catch (error) {
            console.error('Failed to fetch sections:', error);
        }
    };
    

    //Method used when user submits course data to create an enrollment
    const handleSubmit = async (e) => {
        e.preventDefault();
        const enrollmentPost = { sectionId, studentId };

        try {
            const response = await fetch('http://localhost:8080/enrollments', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`,
                    "Accept-Encoding": "gzip, deflate, br",
                    "Connection": "keep-alive"
                },
                body: JSON.stringify(enrollmentPost)
            });

            if (!response.ok) throw new Error('Failed to create enrollment');

            const data = await response.json();
            console.log("Enrollment created, ID: ", data.id);
            alert('Enrollment Created Successfully');
        } catch (error) {
            console.error("Error creating enrollment: ", error);
            alert(`Error creating enrollment: ${error.message}`);
        }
    };

    return (

        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Create Enrollment</h1>
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
                <h2>Select Student</h2>
                    <select value={studentId} onChange={(e) => setStudentId(e.target.value)} required className="form-select">
                        <option value="">Select a Student</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>
                        ))}
                    </select>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );

}
export default EnrollmentForm;