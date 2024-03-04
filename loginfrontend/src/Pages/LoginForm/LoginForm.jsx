//Name: Sam Miller
//Project: Scrum of the Earth
//Purpose: Frontend page for users to login. Currently the home page.
import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        const User = { username, password };
        console.log(User);
        const postArgs = {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "*/*", "Accept-Encoding": "gzip, deflate, br", "Connection": "keep-alive"},
            body: JSON.stringify(User)
        };
        fetch('http://localhost:8080/login', postArgs).then(() => {
            console.log("User Logged In");
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
                {/* <div className="remember-forgot">
                    <label htmlFor=""><input type='checkbox' />Remember me</label>
                    <a href='#'>Forgot Password</a>
                </div> */}
                <button type="submit">Login</button>
                {/* <div className="register-link">
                    <p>Don't have an account? <a href='#'>Register</a></p>
                </div> */}
            </form>
        </div>
    );
};

export default LoginForm;