import React, { useState } from "react";

function CreateUser() {
    const options = [
        {label: "Student", value: "Student"},
        {label: "Professor", value: "Professor"},
        {label: "Administrator", value: "Administrator"},
    ]
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [type, setType] = useState("")
    const changeUsername = event => {
        setUsername(event.target.value)
    }
    const changePassword = event => {
        setPassword(event.target.value)
    }
    const handleSelect = event => {
        setType(event.target.value)
    }
    const handleClick = (e) => {
        e.preventDefault();
        const user = {username, password, type}
        console.log(user)
        const postArgs = {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "*/*", "Accept-Encoding": "gzip, deflate, br", "Connection": "keep-alive"},
            body: JSON.stringify(user)
        };
        fetch('http://localhost:8080/login', postArgs).then(() => {
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