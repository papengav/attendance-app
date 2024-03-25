//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Frontend page for users to create couses.
import React, { useState } from 'react';
import './CreateCourse.css';

const CreateCourse = () => {
    const [courseName, setCourseName] = useState('')
    const [numSections, setNumSections] = useState()
    const [professorName, setProfessorName] = useState('')
    // const changeCourseName = event => {
    //     setCourseName(event.target.value)
    // }
    // const changeNumSections = event => {
    //     setNumSections(event.target.value)
    // }
    // const changeProfessorName = event => {
    //     setProfessorName(event.target.value)
    // }
    const handleClick = (e) => {
        e.preventDefault();
        const course = {courseName, numSections, professorName}
        console.log(course);
        const postArgs = {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "*/*", "Accept-Encoding": "gzip, deflate, br", "Connection": "keep-alive"},
            body: JSON.stringify(course)
        };
        fetch('http://localhost:8080/createCourse', postArgs).then(() => {
            console.log("Course created");
        });
    };
    return (
        <div className='wrapper'>
            <form onSubmit={handleClick}>
                <h1>Create Course</h1>
                <div className='input-box'>
                    <h2>Input Course Name</h2>
                    <input
                    type= "text"
                    placeholder='Course Name'
                    value={courseName}
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
        </div>
        //this is the old implementation pre-styling

        // <div className="d-flex justify-content-center mt-5">
        //     <div className='w-50 p-3 border rounded'>
        //         <h4>Input Course Name</h4>
        //         <input onChange={changeCourseName} value = {courseName}/>
        //     </div>
        //     <div className='w-50 p-3 border rounded'>
        //         <h4>Input Number of Sections</h4>
        //         <input onChange={changeNumSections} value = {numSections}/>
        //     </div>
        //     <div className='w-50 p-3 border rounded'>
        //         <h4>Input Professor Name</h4>
        //         <input onChange={changeProfessorName} value = {professorName}/>
        //     </div>
        //     <div>
        //         <button onClick={handleClick}>Submit</button>
        //     </div>
        // </div>
    );
};

export default CreateCourse;