import React from 'react';
import { Link } from 'react-router-dom';
import './backgrounds.css';

const Login = () => {
  return (
    <div className="dot-background">
      <div className="dot-pattern"></div>
      <div className="fade"></div>
      <div className="content">
        <div className="login-container">
          <h1>Bus Management System</h1>
          <p>Select your role to login:</p>
          <div className="login-buttons">
            <Link to="/student-login" className="btn">Student Login</Link>
            <Link to="/parent-login" className="btn">Parent Login</Link>
            <Link to="/teacher-login" className="btn">Teacher Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
