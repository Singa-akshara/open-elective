import React, { useState } from 'react';
import './HomePage.css';

function HomePage() {
  const courses = [
    { code: "CS101", name: "Introduction to Programming", faculty: "Dr. Jyothi S Nayak", branches: "CS, IT" },
    { code: "CS102", name: "Data Structures", faculty: "Dr. Jyothi S Nayak", branches: "CS, IT, EE" },
    { code: "CS103", name: "Algorithms", faculty: "Dr. Jyothi S Nayak", branches: "CS, IT" },
    { code: "CS104", name: "Operating Systems", faculty: "Dr. Jyothi S Nayak", branches: "CS, IT, EE" },
    { code: "CS105", name: "Database Systems", faculty: "Dr. Jyothi S Nayak", branches: "CS, IT" },
    { code: "CS106", name: "Computer Networks", faculty: "Dr. Jyothi S Nayak", branches: "CS, IT" },
    { code: "CS107", name: "Software Engineering", faculty: "Dr. Jyothi S Nayak", branches: "CS, IT, EE" },
    { code: "CS108", name: "Artificial Intelligence", faculty: "Dr. Jyothi S Nayak", branches: "CS, IT" },
    { code: "CS109", name: "Machine Learning", faculty: "Dr. Jyothi S Nayak", branches: "CS, IT" },
    { code: "CS110", name: "Web Development", faculty: "Dr. Jyothi S Nayak", branches: "CS, IT" }
    // ... include all courses here
  ];

  const [selectedCourse, setSelectedCourse] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [pendingCourse, setPendingCourse] = useState("");

  const handleCheckboxChange = (courseCode) => {
    if (selectedCourse && selectedCourse !== courseCode) {
      setShowPopup(true);
    } else if (!selectedCourse || selectedCourse === courseCode) {
      setPendingCourse(courseCode);
      setShowConfirmPopup(true);
    }
  };

  const handleConfirm = () => {
    setSelectedCourse(pendingCourse);
    setShowConfirmPopup(false);
    setPendingCourse("");
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCloseConfirmPopup = () => {
    setShowConfirmPopup(false);
    setPendingCourse("");
  };

  return (
    <div className="home-page">
      {/* Course Layout with checkboxes */}
      <div className="container">
        <div className="header">Course Layout</div>
        <div className="row header-row">
          <div className="column">Course Code</div>
          <div className="column">Course Name</div>
          <div className="column">Faculty Name</div>
          <div className="column">Branches Eligible</div>
          <div className="column">Select</div>
        </div>
        {courses.map((course) => (
          <div key={course.code} className="row">
            <div className="column">{course.code}</div>
            <div className="column">{course.name}</div>
            <div className="column">{course.faculty}</div>
            <div className="column">{course.branches}</div>
            <div className="column">
              <input
                type="checkbox"
                className="course-checkbox"
                checked={selectedCourse === course.code}
                onChange={() => handleCheckboxChange(course.code)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Popup warning */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>You have already selected a course.</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      {/* Confirmation popup */}
      {showConfirmPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure you want to proceed?</p>
            <button onClick={handleConfirm}>Yes</button>
            <button onClick={handleCloseConfirmPopup}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
