//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Frontend page for Admins to create enrollments for Students.

// Import necessary modules and CSS
import React, { useState, useEffect } from 'react';
import './EnrollmentForm.css'; // Styles specific to this form
import Cookies from 'js-cookie'; // Library to handle cookies

// EnrollmentForm component definition
const EnrollmentForm = () => {
    // State hooks to manage form fields and fetched data
    const [studentId, setStudentId] = useState('');
    const [students, setStudents] = useState([]);
    const [sectionId, setSectionId] = useState('');
    const [sections, setSections] = useState([]);
    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState('');
    const [jwt, setJwtToken] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isErrorUndo, setIsErrorUndo] = useState(false);
    const [isErrorRedo, setIsErrorRedo] = useState(false);
    const [userStack, setUserStack] = useState([]); // State variable to store enrollment stack
    const [userStackRedo, setUserStackRedo] = useState([]); // State variable to store undone enrollment stack
    const [idStack, setIdStack] = useState([]); //state variable to store enrollment IDs
    const [idStackRedo, setIdStackRedo] = useState([]); //state variable to store undone enrollment IDs
    

    useEffect(() => {
        if (feedbackMessage) {
            const timer = setTimeout(() => {
                setFeedbackMessage('');
            }, 5000);  // Clears feedback after 5 seconds
    
            return () => clearTimeout(timer);
        }
    }, [feedbackMessage]);

    // Function to update course ID and fetch sections for that course
    const setNewCourseId = (newCourseId) => {
        setCourseId(newCourseId);
        if (newCourseId) fetchSectionsByCourseId(newCourseId);
    };

    // Fetch JWT from cookies when component mounts
    useEffect(() => {
        const jwtToken = Cookies.get('jwt_authorization');
        setJwtToken(jwtToken);
    }, []);

    // Fetch students and courses when JWT is available
    useEffect(() => {
        if (jwt) {
            fetchStudents();
            fetchCourses();
        }
    }, [jwt]);
    // Push a user onto the stack
const pushUser = (user) => {
    setUserStack(prevStack => [...prevStack, user]);
};

// Pop a user from the stack and return the popped user
const popUser = () => {
    let poppedUser; // Define poppedUser outside the setUserStack callback

    setUserStack(prevStack => {
        const newStack = [...prevStack];
        poppedUser = newStack.pop(); // Store the popped user
        return newStack; // Return the modified stack without the popped user
    });

    return poppedUser; // Return the popped user
};
    // Push a user onto the stack
const pushUserRedo = (user) => {
    setUserStackRedo(prevStack => [...prevStack, user]);
};

// Pop a user from the stack and return the popped user
// Pop a user from the stack and return the popped user
const popUserRedo = () => {
    let poppedUser; // Define poppedUser outside the setUserStack callback

    setUserStackRedo(prevStack => {
        const newStack = [...prevStack];
        poppedUser = newStack.pop(); // Store the popped user
        return newStack; // Return the modified stack without the popped user
    });

    return poppedUser; // Return the popped user
};
// Pop a user from the stack and return the popped user
const popId = () => {
    let poppedUser; // Define poppedUser outside the setUserStack callback

    setIdStack(prevStack => {
        const newStack = [...prevStack];
        poppedUser = newStack.pop(); // Store the popped user
        return newStack; // Return the modified stack without the popped user
    });

    return poppedUser; // Return the popped user
};
    // Push a user onto the stack
const pushId = (user) => {
    setIdStack(prevStack => [...prevStack, user]);
};
// Pop a user from the stack and return the popped user
const popIdRedo = () => {
    let poppedUser; // Define poppedUser outside the setUserStack callback

    setIdStackRedo(prevStack => {
        const newStack = [...prevStack];
        poppedUser = newStack.pop(); // Store the popped user
        return newStack; // Return the modified stack without the popped user
    });

    return poppedUser; // Return the popped user
};
    // Push a user onto the stack
const pushIdRedo = (user) => {
    setIdStackRedo(prevStack => [...prevStack, user]);
};

    // Async function to fetch students from backend
    const fetchStudents = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/by-roleId?roleId=3`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStudents(data || []);
        } catch (error) {
            console.error('Failed to fetch students:', error);
        }
    };

    // Async function to fetch courses from backend
    const fetchCourses = async () => {
        try {
            const response = await fetch(`http://localhost:8080/courses`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCourses(data || []);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        }
    };

    // Fetch sections based on selected course
    const fetchSectionsByCourseId = async (courseId) => {
        if (!courseId) return;
    
        const url = new URL('http://localhost:8080/sections/by-courseId');
        url.searchParams.append('courseId', courseId);
    
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSections(data || []);
        } catch (error) {
            console.error('Failed to fetch sections:', error);
        }
    };
    
    // Handle form submission to create an enrollment
    const handleSubmit = async (e) => {
        e.preventDefault();
        const enrollmentPost = { sectionId, studentId };
        pushUser(enrollmentPost);

        try {
            const response = await fetch('http://localhost:8080/enrollments', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                },
                body: JSON.stringify(enrollmentPost)
            });

            if (!response.ok) throw new Error('Failed to create enrollment');

            const data = await response.json();
            const ID = data.id // fixx this
            setFeedbackMessage("Enrollment created successfully");
            setIsError(false);
            pushId(ID)
        } catch (error) {
            setFeedbackMessage(`Error creating enrollment: ${error.message}`);
            setIsError(false);
        }
    };
    // Handles undoing the most recent user on the stack
    const handleUndo = (e) => {
        e.preventDefault();
        const enrollmentTemp = popUser()
        const ID = popId()
        pushUserRedo(enrollmentTemp)
        pushIdRedo(ID)
        const undo = {}
        //config post
        const postArgs = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            },
            body: JSON.stringify(undo)
        };
    

        //send post to the API
        fetch('http://localhost:8080/', postArgs)
        .then(data => {
            setFeedbackMessage(`User undone successfully!`);
            setIsErrorUndo(false);
        })
        .catch(error => {
            setFeedbackMessage(`Error undoing user: ${error.message}`);
            setIsErrorUndo(true);
        });
    }
    // Handles redoing the most recent user on the stack
    const handleRedo = async (e) => {
        e.preventDefault();
        const enrollmentPost = popUserRedo()
        pushUser(enrollmentPost);
        const ID = popIdRedo()
        pushId(ID)

        try {
            const response = await fetch('http://localhost:8080/enrollments', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                },
                body: JSON.stringify(enrollmentPost)
            });

            if (!response.ok) throw new Error('Failed to create enrollment');

            const data = await response.json();
            setFeedbackMessage("Enrollment created successfully");
            setIsError(false);
        } catch (error) {
            setFeedbackMessage(`Error creating enrollment: ${error.message}`);
            setIsError(false);
        }
    }

    // JSX to render the form with dynamic dropdowns
    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Create Enrollment</h1>
                {feedbackMessage && (
                <div className={`feedback-message ${isError ? 'error-message' : 'success-message'}`}>
                    {feedbackMessage}
                </div>
                )}
                <div className='input-box'>
                    <h2>Select Course</h2>
                    <select value={courseId} onChange={(e) => setNewCourseId(e.target.value)} required className="form-select">
                        <option value="">Select a Course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>{course.name}</option>
                        ))}
                    </select>
                </div>
                <div className='input-box'>
                    <h2>Select a Section</h2>
                    <select value={sectionId} onChange={(e) => setSectionId(e.target.value)} required className="form-select">
                        <option value="">Select a Section</option>
                        {sections.map((section) => (
                            <option key={section.id} value={section.id}>{section.roomNum}</option>
                        ))}
                    </select>
                </div>
                <div className='input-box'>
                    <h2>Select Student</h2>
                    <select value={studentId} onChange={(e) => setStudentId(e.target.value)} required className="form-select">
                        <option value="">Select a Student</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>
                        ))}
                    </select>
                </div>
                <div>
                <button type="submit">Submit</button>
                </div>
                <div>
                    <button onClick={handleUndo}>Undo</button>
                    <button onClick={handleRedo}>Redo</button>
                </div>
            </form>
        </div>
    );
}

export default EnrollmentForm; // Export the component for use in other parts of the application
