/*
Name: Dylan Brodie
Project: Attendance App - This is a full stack attendance tracking and managament software
Purpose: Page to view attendance logs in our database
*/
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './ViewAttendanceLogs.css';
import '../../Components/Styles/GruvboxTheme.css';


const ViewAttendanceLogs = () => {
    const [attendanceLogs, setAttendanceLogs] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [studentId, setStudentId] = useState()
    const [students, setStudents] = useState([])
    const [sectionId, setSectionId] = useState()
    const [sections, setSections] = useState([])
    const jwtToken = useFetchJWT();

    function useFetchJWT() {
        const [jwtToken, setJwtToken] = useState('');
        useEffect(() => {
            const jwt = Cookies.get('jwt_authorization');
            console.log('JWT Token:', jwt);
            setJwtToken(jwt);
        }, []);
        return jwtToken;
    }

    const setNewStudent = (newStudentId) => {
        setStudentId(newStudentId);
        if (newStudentId) {
            fetchSections(newStudentId);
            if (jwtToken) {
                fetchAttendanceLogs();
            }
        }
    }

    const setNewSection = (newSectionId) => {
        setSectionId(newSectionId);
        if (newSectionId {
            fetchSections
        })
    }

    useEffect(() => {
        if (jwtToken) {
            fetchStudents();
        }
    }, [jwtToken]);

    const fetchAttendanceLogs = () => {
        const url = new URL('http://localhost:8080/viewAttendnaceLogs/by-studentId-and-sectionId');
        url.searchParams.append('student_id', studentId);
        url.searchParams.append('section_id', sectionId);        
        url.searchParams.append('page', page);
        url.searchParams.append('size', pageSize);
        url.searchParams.append('sort', `id,asc`);

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                  setAttendanceLogs(data || []);
                  setTotalPages(data.totalPages);
                console.log('Data fetched:', data);
            })
            .catch(error => {
                console.error('Error fetching attendance logs:', error);
            });
    };

    const fetchStudents = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/by-roleId?roleId=3`, {
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
            console.log(data);
            setStudents(data || []);
        } catch (error) {
            console.error('Failed to fetch students:', error);
        }
    };

    const fetchSections = async (studentId) => {
        if (!studentId) return;
    
        const url = new URL('http://localhost:8080/sections');
        url.searchParams.append('studentId', studentId);
        url.searchParams.append('page', 0);
        url.searchParams.append('size', 100);
    
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
            console.log('Sections data:', data);
            setSections(data || []);
        } catch (error) {
            console.error('Failed to fetch sections:', error);
        }
    };

    function handleNextButton() {
      
    }

    function handlePreviousButton() {
      
    }

    function createTable(AttendanceLogs) {     
      return (
        <div>
            <div className='input-box'>
                    <h2>Select Student</h2>
                        <select value={studentId} onChange={(e) => setNewStudent(e.target.value)} required className="form-select">
                            <option value="">Select a Student</option>
                            {students.map((student) => (
                                <option key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>
                            ))}
                        </select>
                    </div>
                    <div className='input-box'>
                    <h2>Select a Section</h2>
                        <select value={sectionId} onChange={(e) => setNewSection(e.target.value)} required className="form-select">
                            <option value="">Select a Section</option>
                            {sections.map((section) => (
                                <option key={section.id} value={section.id}>{section.roomNum}</option>
                            ))}
                        </select>
                    </div>
            <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Student ID</th>
                            <th>Section ID</th>
                            <th>Date-time</th>
                            <th>Excused</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceLogs.map(attendanceLog => (
                            <tr key={attendanceLog.id}>
                                <td>{attendanceLog.id}</td>
                                <td>{attendanceLog.student_id}</td>
                                <td>{attendanceLog.section_id}</td>
                                <td>{attendanceLog.date_time}</td>
                                <td>{attendanceLog.excused}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    console.log(attendanceLogs)
    
    return (
        <div className='wrapper'>
            {createTable(attendanceLogs)}
            <div className='button-container' style={{ marginTop: '20px', marginBottom: '20px' }}>
                <button onclick={handlePreviousButton()}>Previous</button>
                <button onClick={handleNextButton()}>Next</button>
            </div>
        </div>
    );
};

export default ViewAttendanceLogs;
