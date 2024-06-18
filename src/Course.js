import React from 'react';

function Course({ course, onApprove, onReject }) {
  return (
    <div>
      <h2>{course.code} ({course.name}) -{course.students.length} students</h2>
      <button onClick={() => onApprove(course.id)}>Approve</button>
      <button onClick={() => onReject(course.id)}>Reject</button>
      <ul>
        {course.students.map((student) => (
          <li key={student.id}> {student.usn} {student.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Course;
