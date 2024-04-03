//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Frontend page for users to create sections.
import React, { useState, useEffect } from 'react';
import './CreateSection.css';
import Cookies from 'js-cookie';

const CreateSection = () => {
    const [name, setCourseName] = useState('')
    const [numSections, setNumSections] = useState()
    const [professorName, setProfessorName] = useState('')
    const [roomNum, setRoomNumber] = useState()
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [numberOfStudent, setNumStudents] = useState()
    const [dayOfWeek, setDayOfWeek] = useState()
    const [courseId, setCourseID] = useState()
    const [sectionId, setSectionID] = useState()
    const [jwt_token, setJwt_token] = useState()
    // const changeRoomNumber = event => {
    //     setRoomNumber(event.target.value)
    // }
    // const changeStartTime = event => {
    //     setStartTime(event.target.value)
    // }
    // const changeEndTime = event => {
    //     setEndTime(event.target.value)
    // }
    // const changeNumStudents = event => {
    //     setNumStudents(event.target.value)
    // }
    function useFetchJWT() {
        useEffect(() => {
            // Retrieve JWT token from the cookie
            const jwt_tokenT = Cookies.get('jwt_authorization');
            console.log('JWT Token: ', jwt_tokenT);
            setJwt_token(jwt_tokenT)
        }, []);
    }
    function useHandleClickC() {
        useFetchJWT();

        const handleClickC = (e) => {
            e.preventDefault();
            //const course = {courseName, numSections, professorName}
            const course = {name}
            console.log(course);
            console.log(JSON.stringify(name));
            const postArgs = {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept-Encoding": "gzip, deflate, br", "Connection": "keep-alive", "Authorization": "Bearer "+ jwt_token},
                body: JSON.stringify({name})
            };
            fetch('http://localhost:8080/courses', postArgs).then((response) => {
                console.log("Course created");
                return response.json();
            })
            .then(data => {
                const courseID = data.id; 
                console.log(courseID);
                console.log("course name: ", name);
                setCourseID(courseID);
                alert('Course Created')
            });
        };

        return handleClickC;
    }
    function useHandleClickS() {
        useFetchJWT();

        const handleClickS = (e) => {
            e.preventDefault();
            //const section = {roomNumber, startTime, endTime, numStudents}m move start/end times to meeting time
            const section = {roomNum, numberOfStudent, courseId}
            console.log(section);
            console.log("Stringified: ", JSON.stringify(section))
            const postArgs = {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept-Encoding": "gzip, deflate, br", "Connection": "keep-alive", "Authorization": "Bearer "+ jwt_token},
                body: JSON.stringify(section)
            };
            fetch('http://localhost:8080/sections', postArgs).then((response) => {
                console.log("Section created");
                return response.json()
            })
            .then(data => {
                const sectionID = data.id; 
                console.log("Section ID: ",sectionID);
                setSectionID(sectionID);
                alert('Section Created')
            });
        };

        return handleClickS;
    }
    function useHandleClickM() {
        useFetchJWT();

        const handleClickM = (e) => {
            e.preventDefault();
            const meetingTime = {startTime, endTime, dayOfWeek, sectionId}
            console.log(meetingTime);
            const postArgs = {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept-Encoding": "gzip, deflate, br", "Connection": "keep-alive", "Authorization": "Bearer "+ jwt_token},
                body: JSON.stringify(meetingTime)
            };
            fetch('http://localhost:8080/meetingtimes', postArgs).then(() => {
                console.log("Meeting Time created");
                alert('Meeting Time Created')
            });
        };

        return handleClickM;
    }
    const handleClickC = useHandleClickC();
    const handleClickS = useHandleClickS();
    const handleClickM = useHandleClickM();


    return (
        //missing choosing meeting dates
        //try to make it so user can select days of the week
        <div className='wrapper'>
            <form onSubmit={handleClickC}>
                <h1>Create Course</h1>
                <div className='input-box'>
                    <h2>Input Course Name</h2>
                    <input
                    type= "text"
                    placeholder='Course Name'
                    value={name}
                    onChange= {(e) => setCourseName(e.target.value)}
                    required
                    />
                </div>
                <div className='input-box'>
                    <h2>Input Number of Sections</h2>
                    <input
                    type= "number"
                    placeholder='1'
                    value={numSections}
                    onChange={(e) => setNumSections(e.target.value)}
                    required
                    />
                </div>
                <div className='input-box'>
                    <h2>Input Professor Name</h2>
                    <input
                    type= "text"
                    placeholder='Professor Name'
                    value={professorName}
                    onChange={(e) => setProfessorName(e.target.value)}
                    required
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
            <form onSubmit={handleClickS}>
                <h1>Create Section</h1>
                <div className='input-box'>
                    <h2>Input Room Number</h2>
                    <input
                    type= "text"
                    placeholder='001A'
                    value={roomNum}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    required
                    />
                </div>
                {/* <div className='input-box'>
                    <h2>Input Start time</h2>
                    <input
                    type= "time"
                    placeholder='1:00 pm'
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                    />
                </div>
                <div className='input-box'>
                    <h2>Input End Time</h2>
                    <input
                    type = "time"
                    placeholder='1:50 pm'
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                    />
                </div> */}
                <div className='input-box'>
                    <h2>Input Number of Students</h2>
                    <input
                    type= "number"
                    placeholder='1'
                    value={numberOfStudent}
                    onChange={(e) => setNumStudents(e.target.value)}
                    required
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
            <form onSubmit={handleClickM}>
                <h1>Create Meeting Time</h1>
                <div className='input-box'>
                    <h2>Input Start time</h2>
                    <input
                    type= "time"
                    placeholder='1:00 pm'
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                    />
                </div>
                <div className='input-box'>
                    <h2>Input End Time</h2>
                    <input
                    type = "time"
                    placeholder='1:50 pm'
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                    />
                </div>
                <div className='input-box'>
                    <h2>Input Day of the Week</h2>
                    <input
                    type= "number"
                    placeholder='1'
                    value={dayOfWeek}
                    onChange={(e) => setDayOfWeek(e.target.value)}
                    required
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>

        //This is the old implementation pre-styling

        // <div className='d-flex justify-content-center mt-5'>
        //     <div className='w-50 p-3 border rounded'>
        //         <h4>Input Section Room Number</h4>
        //         <input onChange={changeRoomNumber} value= {roomNumber}/>
        //     </div>
        //     <div className='w-50 p-3 border rounded'>
        //         <h4>Input Section Start Time</h4>
        //         <input onChange={changeStartTime} value = {startTime}/>
        //     </div>
        //     <div className='w-50 p-3 border rounded'>
        //         <h4>Input Section End Time</h4>
        //         <input onChange={changeEndTime} value = {endTime}/>
        //     </div>
        //     <div className='w-50 p-3 border rounded'>
        //         <h4>Input Number of Students</h4>
        //         <input onChange={changeNumStudents} value = {numStudents}/>
        //     </div>
        //     <div>
        //         <button onClick={handleClick}>Submit</button>
        //     </div>
        // </div>
    );
};

export default CreateSection;