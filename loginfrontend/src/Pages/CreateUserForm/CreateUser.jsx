//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Frontend page for creating new users

// Importing necessary libraries and stylesheets
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'; // Library to handle cookies for auth
import './CreateUser.css'; // Component specific styles
import '../../Components/Styles/GruvboxTheme.css'; // Global theme styles

/**
 * The CreateUser component allows creating new users with different roles
 * and manages user input as well as communication with the backend API.
 */
function CreateUser() {
    // Predefined user role options
    const options = [
        { label: "Student", value: 3 },
        { label: "Professor", value: 2 },
        { label: "Administrator", value: 1 },
    ];

    // State variables to store user inputs and system messages
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [roleId, setRoleId] = useState(3); // Default to Student
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [studentCardId, setCardId] = useState("");
    const [jwtToken, setJwtToken] = useState(""); // JWT for auth
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isErrorUndo, setIsErrorUndo] = useState(false);
    const [isErrorRedo, setIsErrorRedo] = useState(false);
    const [userStack, setUserStack] = useState([]); // State variable to store user stack
    const [userStackRedo, setUserStackRedo] = useState([]); // State variable to store undone user stack
    const [idStack, setIdStack] = useState([]); //state variable to store user IDs
    const [idStackRedo, setIdStackRedo] = useState([]); //state variable to store undone user IDs

    useEffect(() => {
        if (feedbackMessage) {
            const timer = setTimeout(() => {
                setFeedbackMessage('');
            }, 5000);  // Clears feedback after 5 seconds
    
            return () => clearTimeout(timer);
        }
    }, [feedbackMessage]);

    // Fetch the JWT token when the component mounts and set it to state
    useEffect(() => {
        const jwt = Cookies.get('jwt_authorization');
        setJwtToken(jwt);
    }, []);

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


    // Handle form submission for creating a new user
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { firstName, lastName, studentCardId, username, password, roleId };
        pushUser(user);

        // Configuration for the POST request
        const postArgs = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwtToken
            },
            body: JSON.stringify(user)
        };

        // Send POST request to backend API
        fetch('http://localhost:8080/users', postArgs)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create user');
                }
                return response.json();
            })
            .then(data => {
                setFeedbackMessage(`User created successfully!`);
                setIsError(false);
                const ID = data.id//fix this
                pushId(ID)
            })
            .catch(error => {
                setFeedbackMessage(`Error creating user: ${error.message}`);
                setIsError(true);
            });
        
    };

    // Handles undoing the most recent user on the stack
    const handleUndo = (e) => {
        e.preventDefault();
        const user = popUser()
        const ID = popId()
        pushIdRedo(ID)
        pushUserRedo(user)
        //config post
        const postArgs = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwtToken
            },
            body: JSON.stringify()
        };
    

        //send post to the API
        fetch('http://localhost:8080/users/${ID}', postArgs)
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
    const handleRedo = (e) => {
        e.preventDefault();
        const user = popUserRedo()
        pushUser(user)
        const ID = popIdRedo()
        pushId(ID)
        // Configuration for the POST request
        const postArgs = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwtToken
            },
            body: JSON.stringify(user)
        };

        // Send POST request to backend API
        fetch('http://localhost:8080/users', postArgs)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create user');
                }
                return response.json();
            })
            .then(data => {
                setFeedbackMessage(`User created successfully!`);
                setIsError(false);
            })
            .catch(error => {
                setFeedbackMessage(`Error creating user: ${error.message}`);
                setIsError(true);
            });
    }

    // JSX for rendering the form
    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Create User</h1>
                {feedbackMessage && (
                <div className={`feedback-message ${isError ? 'error-message' : 'success-message'}`}>
                    {feedbackMessage}
                </div>
                )}
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

export default CreateUser; // Export the component for use elsewhere in the application
