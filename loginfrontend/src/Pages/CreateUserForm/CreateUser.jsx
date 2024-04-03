//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Frontend page for creating new users
import { HdrAutoOutlined } from "@mui/icons-material";
import { even } from "check-types";
import React, { useState, useEffect } from "react";
import { valid } from "semver";
import Cookies from 'js-cookie';

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


    // const changeCardId = event => {
    //     setCardId(event.target.value)
    // }
    // const changeFirstname = event => {
    //     setFirstname(event.target.value)
    // }
    // const changeLastname = event => {
    //     setLastname(event.target.value)
    // }
    // const changeUsername = event => {
    //     setUsername(event.target.value)
    // }
    // const changePassword = event => {
    //     setPassword(event.target.value)
    // }
    const handleSelect = event => {
        setroleID(event.target.value)
    }

    function useFetchJWT() {
        useEffect(() => {
            // Retrieve JWT token from the cookie
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
                        placeholder="Lastname"
                        value={lastName}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    <h2>Input Card ID</h2>
                    <input
                        type="text"
                        placeholder="00 00 00 00 00"
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



        //this is the old implementation pre-styling


        // <div className="d-flex justify-content-center mt-5">
        //     <div className="w-50 p-3 border rounded">
        //         <h4>Select User Type</h4>
        //         <select onChange={handleSelect} className="form-select">
        //             {options.map(option => (
        //                 <option value={option.value}>{option.label}</option>
        //             ))}
        //         </select>
        //     </div>
        //     <div className="w-50 p-3 border rounded">
        //         <h4>Input First Name</h4>
        //         <input onChange={changeFirstname} value= {firstName}/>
        //     </div>
        //     <div className="w-50 p-3 border rounded">
        //         <h4>Input Last Name</h4>
        //         <input onChange={changeLastname} value= {lastName}/>
        //     </div>
        //     <div className="w-50 p-3 border rounded">
        //         <h4>Input Card ID</h4>
        //         <input onChange={changeCardId} value= {studentCardId}/>
        //     </div>
        //     <div className="w-50 p-3 border rounded">
        //         <h4>Input Username</h4>
        //         <input onChange={changeUsername} value= {username}/>
        //     </div>
        //     <div className="w-50 p-3 border rounded">
        //         <h4>Input Password</h4>
        //         <input onChange={changePassword} value= {password}/>
        //     </div>
        //     <div>
        //         <button onClick={handleClick}>Submit</button>
        //     </div>
        // </div>
    );
}
export default CreateUser;