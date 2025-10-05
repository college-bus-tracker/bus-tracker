import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Map from '../components/Map';
import '../components/Backgrounds.css'; // Import your CSS

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('tracking');

  const backgroundStyles = {
    position: 'relative',
    backgroundSize: '20px 20px',
    backgroundImage: 'radial-gradient(circle, #d3d3d3 1px, transparent 1px)',
    display: 'flex',
    height: '50rem',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    maskImage: 'radial-gradient(ellipse at center, black 80%, transparent 100%)',
    WebkitMaskImage: 'radial-gradient(ellipse at center, black 80%, transparent 100%)',
  };

  const contentStyles = {
    position: 'relative',
    zIndex: 20,
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '80%',
    height: '90%',
    overflow: 'auto',
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'tracking':
        return (
          <section id="tracking" className="active">
            <h1 style={{ textDecoration: 'underline' }}>My Bus Live Location</h1>
            <Map />
          </section>
        );
      case 'boarding':
        return (
          <section id="boarding" className="active">
            <h1 style={{ textDecoration: 'underline' }}>Boarding Information</h1>
            <p>Boarded at: <span id="boarded-time">--:--</span></p>
            <p>Alighted at: <span id="alighted-time">--:--</span></p>
          </section>
        );
      case 'arrival':
        return (
          <section id="arrival" className="active">
            <h1 style={{ textDecoration: 'underline' }}>Estimated Arrival Time</h1>
            <p>Next Stop: <span id="next-stop">Main Street</span></p>
            <p>Estimated Arrival: <span id="eta">--:--</span></p>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="background-container dot-background">
      <div style={backgroundStyles}>
        <div style={contentStyles}>
          <div className="dashboard">
            <aside className="sidebar">
              <h2 style={{ textDecoration: 'underline' }}>Student Dashboard</h2>
              <ul>
                <li><button onClick={() => setActiveSection('tracking')} className={activeSection === 'tracking' ? 'active' : ''}>My Bus Tracking</button></li>
                <li><button onClick={() => setActiveSection('boarding')} className={activeSection === 'boarding' ? 'active' : ''}>Boarding Info</button></li>
                <li><button onClick={() => setActiveSection('arrival')} className={activeSection === 'arrival' ? 'active' : ''}>Estimated Arrival</button></li>
                <li><Link to="/">Logout</Link></li>
              </ul>
            </aside>

            <main className="main-content">
              {renderSection()}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
