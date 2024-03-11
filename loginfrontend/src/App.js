//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Handles routing of the UI pages
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './Pages/LoginForm/LoginForm';
import CreateUserDropdown from './Pages/CreateUserForm/CreateUserDropdown'
import NoPage from './Pages/NoPage/NoPage'
import CreateUser from './Pages/CreateUserForm/CreateUser';
import CreateCourse from './Pages/CreateCourseForm/CreateCourse';
import CreateSection from './Pages/CreateSectionForm/CreateSection';

//Handles the routing of the frontend pages
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<LoginForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/createUser" element={<CreateUser/>}/>
        <Route path="/createCourse" element={<CreateCourse/>}/>
        <Route path="/createSection" element={<CreateSection/>}/>
        <Route path = "*" element={<NoPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
