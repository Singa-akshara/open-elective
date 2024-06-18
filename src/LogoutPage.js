import React from 'react';
import './LogoutPage.css';

function LogoutPage() {
  // Define the logout message
  const logoutMessage = "You have been logged out.";
  
  // Define any additional messages or elements
  const additionalMessage = "Thank you for visiting. We hope to see you again soon!";
  
  return (
    <div className="logout-page">
      <div className="logout-message">{logoutMessage}</div>
      <div className="additional-message">{additionalMessage}</div>
      <button className="logout-button">Login Again</button>
    </div>
  );
}

export default LogoutPage;
