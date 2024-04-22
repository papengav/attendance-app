//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Frontend page for users to login. Currently the home page.
import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import Cookies from "universal-cookie";
import { withRouter, useHistory } from 'react-router-dom';


//Displays the login UI
const LoginForm = () => {
    const cookies = new Cookies();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [jwtToken, setJwtToken] = useState('');

    //method used when user submits login credentials
    //saves the jwt from the API and routes the user to the home page upon succesful login
    const handleClick = (e) => {
        e.preventDefault();
        const User = { username, password };
        console.log(User);
        const postArgs = {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept-Encoding": "gzip, deflate, br", "Connection": "keep-alive"},
            body: JSON.stringify(User)
        };
        fetch('http://localhost:8080/login', postArgs).then(response => {
            console.log(response)
            const contentType = response.headers.get('content-type');
            if(response.status != 404 && contentType.includes('application/json')) {
                return response.json();
            }
            else {
                alert('Incorrect loggin credentials');
            }
        })
        .then(data => {
            console.log("User Logged In");
            const token = data.token; 
            console.log(token);
            setJwtToken(token);
            cookies.set("jwt_authorization", token);
            window.location.href = "/layout";
        });
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleClick}>
                <h1>Login</h1>
                <div className='input-box'>
                    <input
                        type="text"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className='icon' />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;