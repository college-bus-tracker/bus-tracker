import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import '../components/Backgrounds.css'; // Import your CSS
import image from '../images/generated-image.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect to dashboard or appropriate page
    } catch (err) {
      setError(err.message);
    }
  };

  const backgroundStyles = {
    position: 'relative',
    display: 'flex',
    height: '50rem',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  };

  const contentStyles = {
    position: 'relative',
    zIndex: 20,
    color: 'black',
    textAlign: 'right',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    height: '90%',
    marginLeft: 'auto',
    width: '400px',
  };

  return (
    <div className="background-container dot-background"> {/* CSS background wrapper */}
      <div style={backgroundStyles}>
        <img src={image} alt="Bus" style={{ marginRight: '20px', height: '90%', width: 'auto' }} />
        <div style={contentStyles}>
          <h2 style={{ textDecoration: 'underline' }}>Login</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '30px' }}>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Login</button>
          </form>
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
