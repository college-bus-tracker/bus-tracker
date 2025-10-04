import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const backgroundStyles = {
    position: 'relative',
    backgroundSize: '40px 40px',
    backgroundImage: 'linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)',
    display: 'flex',
    height: '50rem',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  };

  const fadeStyles = {
    pointerEvents: 'none',
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    maskImage: 'radial-gradient(ellipse at center, transparent 150px, black)',
    WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 150px, black)',
    zIndex: 10,
  };

  const contentStyles = {
    position: 'relative',
    zIndex: 20,
    color: 'black',
    textAlign: 'center',
  };

  return (
    <div style={backgroundStyles}>
      <div style={fadeStyles}></div>
      <div style={contentStyles}>
        <h1>Bus Management System</h1>
        <p>Select your role to login:</p>
        <div className="login-buttons">
          <Link to="/student-login" className="btn">Student Login</Link>
          <Link to="/parent-login" className="btn">Parent Login</Link>
          <Link to="/teacher-login" className="btn">Teacher Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
 