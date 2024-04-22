//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and management software
//Purpose: Frontend page for Admins to create enrollments for Students.
import React, { useState, useEffect } from 'react';
import './ViewEnrollments.css';
import Cookies from 'js-cookie';
import '../../Components/Styles/GruvboxTheme.css';

const useFetchJWT = () => {
    const [jwtToken, setJwtToken] = useState('');
    useEffect(() => {
        const jwt = Cookies.get('jwt_authorization');
        if (jwt) {
            console.log('JWT Token:', jwt);
            setJwtToken(jwt);
        }
    }, []);
    return jwtToken;
};

const EnrollmentForm = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const jwtToken = useFetchJWT();

    useEffect(() => {
        if (jwtToken) {
            fetchEnrollments();
        }
    }, [page, pageSize, jwtToken]);

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
            setEnrollments(data.content || []);
            setTotalPages(data.totalPages);
            console.log('Data fetched:', data);
        })
        .catch(error => {
            console.error('Error fetching enrollments:', error);
        });
    };

    const handlePreviousButton = () => {
        setPage(Math.max(0, page - 1));
    };

    const handleNextButton = () => {
        setPage(Math.min(totalPages - 1, page + 1));
    };

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

export default EnrollmentForm;
