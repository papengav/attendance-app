//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Handles routing of the UI pages
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './Pages/LoginForm/LoginForm';
import CreateUser from './Pages/CreateUserForm/CreateUser';
import CreateCourse from './Pages/CreateCourseForm/CreateCourse';
import CreateSection from './Pages/CreateSectionForm/CreateSection';
import HomePage from './Pages/HomePage/HomePage';
import Layout from './Pages/Layout/Layout';
import ViewUsersPage from './Pages/ViewUsersPage/ViewUsersPage';
import EnrollmentForm from './Pages/EnrollmentPage/EnrollmentForm';
import CreateMeetingTime from './Pages/CreateMeetingtime/CreateMeetingTimeForm';
import NoPage from './Pages/NoPage/NoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Layout />}>
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/createCourse" element={<CreateCourse />} />
          <Route path="/createSection" element={<CreateSection />} />
          <Route path="/createMeetingTime" element={<CreateMeetingTime />} />
          <Route path="/viewUsers" element={<ViewUsersPage />} />
          <Route path="/createEnrollment" element={<EnrollmentForm />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;