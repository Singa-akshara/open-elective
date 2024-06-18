import React from 'react';
import { useHistory } from 'react-router-dom';

function LoginPage() {
    const history = useHistory();

    const handleLoginClick = (role) => {
        if (role === 'dean') {
            history.push('/dean-login');
        } else if (role === 'student') {
            // Implement student login flow or redirect
            console.log('Student login not implemented yet');
        } else if (role === 'faculty') {
            // Implement faculty login flow or redirect
            console.log('Faculty login not implemented yet');
        }
    };

    return (
        <div>
            <h1>Login As</h1>
            <button onClick={() => handleLoginClick('dean')}>Dean</button>
            <button onClick={() => handleLoginClick('student')}>Student</button>
            <button onClick={() => handleLoginClick('faculty')}>Faculty</button>
        </div>
    );
}

export default LoginPage;
