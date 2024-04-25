//Name: Dylan Brodie
//Project: Attendance App - This is a full stack attendance tracking and management software
//Purpose: Frontend page for Admins to create enrollments for Students.

import React, { useState, useEffect } from 'react';
import './ViewEnrollments.css'; // Styling for the enrollment view
import Cookies from 'js-cookie'; // Library to manage cookies
import '../../Components/Styles/GruvboxTheme.css'; // Global styling theme

// Custom hook for fetching JWT from cookies
const useFetchJWT = () => {
    const [jwtToken, setJwtToken] = useState('');
    useEffect(() => {
        const jwt = Cookies.get('jwt_authorization'); // Retrieve the JWT from cookies
        if (jwt) {
            console.log('JWT Token:', jwt);
            setJwtToken(jwt); // Set JWT in state if present
        }
    }, []);
    return jwtToken;
};

const EnrollmentForm = () => {
    const [enrollments, setEnrollments] = useState([]); // State to store enrollment data
    const [page, setPage] = useState(0); // State for current page
    const [totalPages, setTotalPages] = useState(0); // State for total pages
    const [pageSize, setPageSize] = useState(10); // State for items per page
    const jwtToken = useFetchJWT(); // Get the JWT token

    useEffect(() => {
        if (jwtToken) {
            fetchEnrollments(); // Fetch enrollments when JWT token is available or page state changes
        }
    }, [page, pageSize, jwtToken]);

    // Fetch enrollments from the backend
    const fetchEnrollments = () => {
        const url = new URL('http://localhost:8080/enrollments');
        url.searchParams.append('page', page);
        url.searchParams.append('size', pageSize);
        url.searchParams.append('sort', 'id,asc');

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
            setEnrollments(data.content || []); // Set fetched enrollments
            setTotalPages(data.totalPages); // Set total pages from response
            console.log('Data fetched:', data);
        })
        .catch(error => {
            console.error('Error fetching enrollments:', error);
        });
    };

    // Handlers for pagination
    const handlePreviousButton = () => {
        setPage(Math.max(0, page - 1)); // Decrement page state to previous, minimum is 0
    };

    const handleNextButton = () => {
        setPage(Math.min(totalPages - 1, page + 1)); // Increment page state to next, max is totalPages - 1
    };

    // Function to create a table from enrollment data
    function createTable(enrollments) {
        return (
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.map(enrollment => (
                        <tr key={enrollment.id}>
                            <td>{enrollment.id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    // Render the enrollment table and pagination controls
    return (
        <div className='wrapper'>
            {createTable(enrollments)}
            <div className='button-container' style={{ marginTop: '20px', marginBottom: '20px' }}>
                <button onClick={handlePreviousButton}>Previous</button>
                <button onClick={handleNextButton}>Next</button>
            </div>
        </div>
    );
}

export default EnrollmentForm; // Export component for use in other parts of the application
