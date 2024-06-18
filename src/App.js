import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Footer from './Footer';

import LoginPage from './LoginPage';
import DeanLogin from './DeanLogin';
import StudentLogin from './StudentLogin';
import FacultyLogin from './FacultyLogin';
import FacultyPage from './FacultyPage';
import StudentPage from './StudentPage';
import CourseList from './CourseList';
import HomePage from './HomePage';
import LogoutPage from './LogoutPage';
const loggedIn = window.localStorage.getItem("testLoggedin");

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleApprove = (courseCode) => {
    fetch(`/api/courses/approve/${courseCode}`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        setCourses(courses.map(course => 
          course.courseCode === courseCode ? { ...course, approved: true } : course
        ));
      })
      .catch(error => console.error('Error approving course:', error));
  };

  const handleReject = (courseCode) => {
    fetch(`/api/courses/reject/${courseCode}`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        setCourses(prevCourses => prevCourses.filter(course => course.courseCode !== courseCode));
      })
      .catch(error => console.error('Error rejecting course:', error));
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dean-login" element={<DeanLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/faculty-login" element={<FacultyLogin />} />
        <Route path="/main" element={
          <main>
            <CourseList 
              courses={courses}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </main>
        } />
         <Route path="/courses" element={loggedIn?<StudentPage/>:<StudentLogin></StudentLogin>} />
        <Route path="/student-page" element={<StudentPage />} />
        <Route path="/faculty-page" element={<FacultyPage />} />
        {/* Define route for HomePage */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
      <Footer />
      {/* Link to navigate to HomePage */}
  
    </>
  );
}

export default AppWrapper;

