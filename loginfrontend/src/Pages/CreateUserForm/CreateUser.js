//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Frontend page for creating new users
import { even } from "check-types";
import React, { useState } from "react";
import { valid } from "semver";

//displays the create user UI
function CreateUser() {
    const options = [
        {label: "Student", value: 3},
        {label: "Professor", value: 2},
        {label: "Administrator", value: 1},
    ]
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [roleId, setroleID] = useState(3)
    const [firstName, setFirstname] = useState("")
    const [lastName, setLastname] = useState("")
    const [studentCardId, setCardId] = useState(null)
    const changeCardId = event => {
        setCardId(event.target.value)
    }
    const changeFirstname = event => {
        setFirstname(event.target.value)
    }
    const changeLastname = event => {
        setLastname(event.target.value)
    }
    const changeUsername = event => {
        setUsername(event.target.value)
    }
    const changePassword = event => {
        setPassword(event.target.value)
    }
    const handleSelect = event => {
        setroleID(parseInt(event.target.value, 10))
    }
    //method to handle the user clicking the submit button
    //sends a post to the API
    const handleClick = (e) => {
        e.preventDefault();
        const user = {firstName, lastName, studentCardId, username, password, roleId}
        console.log(user)
        const postArgs = {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "*/*", "Accept-Encoding": "gzip, deflate, br", "Connection": "keep-alive"},
            body: JSON.stringify(user)
        };
        fetch('http://localhost:8080/users', postArgs).then(() => {
            console.log("User created");
        });
    };
    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="w-50 p-3 border rounded">
                <h4>Select User Type</h4>
                <select onSelect={handleSelect} className="form-select">
                    {options.map(option => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            <div className="w-50 p-3 border rounded">
                <h4>Input First Name</h4>
                <input onChange={changeFirstname} value= {firstName}/>
            </div>
            <div className="w-50 p-3 border rounded">
                <h4>Input Last Name</h4>
                <input onChange={changeLastname} value= {lastName}/>
            </div>
            <div className="w-50 p-3 border rounded">
                <h4>Input Card ID</h4>
                <input onChange={changeCardId} value= {studentCardId}/>
            </div>
            <div className="w-50 p-3 border rounded">
                <h4>Input Username</h4>
                <input onChange={changeUsername} value= {username}/>
            </div>
            <div className="w-50 p-3 border rounded">
                <h4>Input Password</h4>
                <input onChange={changePassword} value= {password}/>
            </div>
            <div>
                <button onClick={handleClick}>Submit</button>
            </div>
        </div>
    );
}
export default CreateUser;