// src/Header.js
import React from 'react';
import logo from './bmsce_logo.png'; // Adjust the path as necessary
import './Header.css'; // Make sure you have this CSS file for styles

function Header() {
  return (
    <header>
      <div className="headerLeft">
        <img src={logo} alt="Institution Logo" className="logo" />
        <span>BMS College of Engineering</span>
      </div>
      <nav className="headerRight">
      <a href="/home">Home</a>
        <a href="/courses">Courses</a>
        <a href="#approvals">Approvals</a>
        <a href="#reports">Reports</a>
        <a href="faculty-page">Add course</a>
        <a href="/logout">Logout</a>
      </nav>
    </header>
  );
}

export default Header;
