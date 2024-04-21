//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Frontend page for creating new users
import { HdrAutoOutlined } from "@mui/icons-material";
import { even } from "check-types";
import { valid } from "semver";
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import './CreateUser.css';
import '../../Components/Styles/GruvboxTheme.css';

/**
 * Component to create new users in the Attendance App system.
 * Allows setting user type, names, and credentials, and communicates
 * with the backend to store the new user data.
 */
function CreateUser() {
    // Options for user roles
    const options = [
        { label: "Student", value: 3 },
        { label: "Professor", value: 2 },
        { label: "Administrator", value: 1 },
    ];

    // State hooks for form inputs and JWT token
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [roleId, setRoleId] = useState(3);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [studentCardId, setCardId] = useState("");
    const [jwtToken, setJwtToken] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * Fetches the JWT token from cookies once when the component mounts.
     * This token is used for authenticated requests to the backend.
     */
    useEffect(() => {
        const jwt = Cookies.get('jwt_authorization');
        setJwtToken(jwt);
    }, []);

    /**
     * Handles form submission to create a new user.
     * Prepares user data and sends a POST request to the backend.
     * Updates the UI based on the response from the server.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { firstName, lastName, studentCardId, username, password, roleId };

        const postArgs = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwtToken
            },
            body: JSON.stringify(user)
        };

        fetch('http://localhost:8080/users', postArgs)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create user');
                }
                return response.json();
            })
            .then(data => {
                setConfirmationMessage('User successfully created!');
                console.log("User created", data);
            })
            .catch(error => {
                setErrorMessage('Failed to create user: ' + error.message);
                console.error("Failed to create user", error);
            });
    };

    /**
     * Renders the user creation form with various fields and a submit button.
     * Displays a confirmation message upon successful or failed submission.
     */
    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Create User</h1>
                <div className="confirmation-message">{confirmationMessage}</div>
                <div className="input-box">
                    <h2>Select User Type</h2>
                    <select onChange={(e) => setRoleId(e.target.value)} className="form-select">
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div className="input-box">
                    <h2>Input First Name</h2>
                    <input
                        type="text"
                        placeholder="firstname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    <h2>Input Last Name</h2>
                    <input
                        type="text"
                        placeholder="lastname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    <h2>Input Card ID</h2>
                    <input
                        type="text"
                        placeholder="00 00 00 00"
                        value={studentCardId}
                        onChange={(e) => setCardId(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <h2>Input Username</h2>
                    <input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    <h2>Input Password</h2>
                    <input
                        type="text"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateUser;
