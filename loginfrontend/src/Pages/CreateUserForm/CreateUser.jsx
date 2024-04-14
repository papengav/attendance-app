//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Frontend page for creating new users
import { HdrAutoOutlined } from "@mui/icons-material";
import { even } from "check-types";
import React, { useState, useEffect } from "react";
import { valid } from "semver";
import Cookies from 'js-cookie';
import '../../Components/Styles/GruvboxTheme.css';

//displays the create user UI
function CreateUser() {
    const options = [
        { label: "Student", value: 3 },
        { label: "Professor", value: 2 },
        { label: "Administrator", value: 1 },
    ]
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [roleId, setroleID] = useState(3)
    const [firstName, setFirstname] = useState("")
    const [lastName, setLastname] = useState("")
    const [studentCardId, setCardId] = useState("")
    const [jwt_token, setJwt_token] = useState()

    //Method used when user selects a role from the dropdow menu
    const handleSelect = event => {
        setroleID(event.target.value)
    }

    //Used by handleClick method to get the jwt out of the cookies
    function useFetchJWT() {
        useEffect(() => {
            const jwt_tokenT = Cookies.get('jwt_authorization');
            console.log('JWT Token: ', jwt_tokenT);
            setJwt_token(jwt_tokenT)
        }, []);
    }

    //method to handle the user clicking the submit button
    //sends a post to the API
    function useHandleClick() {
        useFetchJWT();

        const handleClick = (e) => {
            e.preventDefault();
            setroleID(options.map(option => (option.value)))
            const user = { firstName, lastName, studentCardId, username, password, roleId }
            console.log(user)
            console.log("Student's ID: ", studentCardId);
            console.log(jwt_token)

            const postArgs = {
                method: "POST",
                headers: { "Content-Type": "application/json",  "Accept-Encoding": "gzip, deflate, br", "Connection": "keep-alive", "Authorization": "Bearer " +  jwt_token  },
                body: JSON.stringify(user)
            };
            fetch('http://localhost:8080/users', postArgs).then(() => {
                console.log("User created");
            });
        };



        return handleClick;
    }

    const handleClick = useHandleClick();
    return (
        <div className="wrapper">
            <form onSubmit={handleClick}>
                <h1>Create User</h1>
                <div className="input-box">
                    <h2>Select User Type</h2>
                    <select onChange={handleSelect} className="form-select">
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
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    <h2>Input Last Name</h2>
                    <input
                        type="text"
                        placeholder="lastname"
                        value={lastName}
                        onChange={(e) => setLastname(e.target.value)}
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
                <button type="submit" onClick={() => window.history.back()} style={{ marginTop: "10px" }}>Back</button>
            </form>
        </div>
    );
}
export default CreateUser;