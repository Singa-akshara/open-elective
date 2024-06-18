// import React, { useState, useEffect } from 'react';
// import './StudentPage.css'; // Corrected the import path

// function StudentPage() {
//   const [openElectives, setOpenElectives] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     const fetchOpenElectives = async () => {
//       try {
//         const response = await fetch('/api/courses/open-electives');
//         const data = await response.json();
//         if (response.ok) {
//           setOpenElectives(data);
//         } else {
//           throw new Error(data.message || "Failed to fetch data.");
//         }
//       } catch (error) {
//         console.error('Fetch error:', error);
//       }
//     };

//     fetchOpenElectives();
//   }, []);

//   const handleSelectCourse = (course) => {
//     setSelectedCourse(course);
//   };

//   const handleSubmit = async () => {
//     // Ensure total-students is treated as 0 if undefined
//     const currentTotalStudents = selectedCourse ? selectedCourse['total-students'] ?? 0 : 0; // Added null check
  
//     if (selectedCourse && currentTotalStudents < 60) {
//       try {
//         const response = await fetch(`/api/courses/${selectedCourse.courseCode}/increment-total-students`, {
//           method: 'POST',
//         });
  
//         if (response.ok) {
//           const updatedCourse = {
//             ...selectedCourse,
//             'total-students': currentTotalStudents + 1
//           };
//           setOpenElectives(openElectives.map(course =>
//             course._id === selectedCourse._id ? updatedCourse : course
//           ));
//           setSelectedCourse(updatedCourse);
    
//           const currentTime = new Date().toLocaleString();
//           setSuccessMessage(`Successfully selected: ${selectedCourse.open_elective} at ${currentTime}`);
//         } else {
//           const errorData = await response.json();
//           setSuccessMessage(errorData.message || 'Failed to increment total students.');
//         }
//       } catch (error) {
//         console.error('Submit error:', error);
//       }
//     } else {
//       setSuccessMessage('Please select a course first or course is full.');
//     }
//   };

//   return (
//     <div className="student-page-container">
//       <h2 className="page-heading">Open Electives</h2>
//       <table className="electives-table">
//         <thead>
//           <tr>
//             <th>Open Elective</th>
//             <th>Course Code</th>
//             <th>Department</th>
//             <th>Faculty</th>
//             <th>Select</th>
//           </tr>
//         </thead>
//         <tbody className='tbody'>
//           {openElectives.map(elective => (
//             <tr key={elective._id}>
//               <td>{elective.open_elective}</td>
//               <td>{elective.courseCode}</td>
//               <td>{elective.department}</td>
//               <td>{elective.faculty}</td>
//               <td>
//                 {elective['total-students'] >= 60 ? (
//                   <span className="seats-filled">Seats Filled</span>
//                 ) : (
//                   <input
//                     type="radio"
//                     name="selectedElective"
//                     onClick={() => handleSelectCourse(elective)}
//                   />
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="submit-button-container">
//         <button 
//           onClick={handleSubmit} 
//           disabled={!selectedCourse || (selectedCourse['total-students'] && selectedCourse['total-students'] >= 60)} // Corrected the condition
//           className={selectedCourse && selectedCourse['total-students'] >= 60 ? 'disabled-button' : 'active-button'}
//         >
//           Submit
//         </button>
//       </div>
//       {successMessage && (
//         <div className="success-message">
//           <p>{successMessage}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default StudentPage;
import React, { useState, useEffect } from 'react';
import './StudentPage.css';

function StudentPage() {
  const [openElectives, setOpenElectives] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // Added state variable

  useEffect(() => {
    const fetchOpenElectives = async () => {
      try {
        const response = await fetch('/api/courses/open-electives');
        const data = await response.json();
        if (response.ok) {
          setOpenElectives(data);
        } else {
          throw new Error(data.message || "Failed to fetch data.");
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchOpenElectives();
  }, []);

  const handleSelectCourse = (course) => {
    if (!isSubmitted) { // Prevent selection after submission
      setSelectedCourse(course);
    }
  };

  const handleSubmit = async () => {
    const currentTotalStudents = selectedCourse ? selectedCourse['total-students'] ?? 0 : 0;

    if (selectedCourse && currentTotalStudents < 60) {
      try {
        const response = await fetch(`/api/courses/${selectedCourse.courseCode}/increment-total-students`, {
          method: 'POST',
        });

        if (response.ok) {
          const updatedCourse = {
            ...selectedCourse,
            'total-students': currentTotalStudents + 1
          };
          setOpenElectives(openElectives.map(course =>
            course._id === selectedCourse._id ? updatedCourse : course
          ));
          setSelectedCourse(updatedCourse);

          const currentTime = new Date().toLocaleString();
          setSuccessMessage(`Successfully selected: ${selectedCourse.open_elective} at ${currentTime}`);
          setIsSubmitted(true); // Prevent further submissions
        } else {
          const errorData = await response.json();
          setSuccessMessage(errorData.message || 'Failed to increment total students.');
        }
      } catch (error) {
        console.error('Submit error:', error);
      }
    } else {
      setSuccessMessage('The course is full. Please register for another course.');
    }
  };

  return (
    <div className="student-page-container">
      <h2 className="page-heading">Open Electives</h2>
      <table className="electives-table">
        <thead>
          <tr>
            <th>Open Elective</th>
            <th>Course Code</th>
            <th>Department</th>
            <th>Faculty</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {openElectives.map(elective => (
            <tr key={elective._id}>
              <td>{elective.open_elective}</td>
              <td>{elective.courseCode}</td>
              <td>{elective.department}</td>
              <td>{elective.faculty}</td>
              <td>
                {elective['total-students'] >= 60 ? (
                  <span className="seats-filled">Seats Filled</span>
                ) : (
                  <input
                    type="radio"
                    name="selectedElective"
                    onClick={() => handleSelectCourse(elective)}
                    disabled={isSubmitted} // Disable after submission
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="submit-button-container">
        <button 
          onClick={handleSubmit} 
          disabled={!selectedCourse || isSubmitted || (selectedCourse['total-students'] && selectedCourse['total-students'] >= 60)}
          className={!selectedCourse || isSubmitted || (selectedCourse && selectedCourse['total-students'] >= 60) ? 'disabled-button' : 'active-button'}
        >
          Submit
        </button>
      </div>
      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
}

export default StudentPage;




