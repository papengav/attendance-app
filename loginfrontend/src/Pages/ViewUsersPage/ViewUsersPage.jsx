/*
Name: Dylan Brodie
Project: Attendance App - This is a full stack attendance tracking and managament software
Purpose: Page to view users in our database
*/

import React, { useState, useEffect } from 'react';
import './ViewUsersPage.css';
import '../../Components/Styles/GruvboxTheme.css';

const ViewUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  function getRole(roleId) {
      if (roleId == 1) {
        return "Administrator"
      }
      if (roleId = 2) {
        return "Professor"
      }
      if (roleId = 3) {
        return "Student"
      }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading users: {error}</p>;

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Student ID Card</th>
          <th>Username</th>
          <th>Password</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.studentIdCard}</td>
            <td>{user.username}</td>
            <td>{user.password}</td>
            <td>{getRole(user.roleId)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ViewUsersPage;