import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Map from './Map';

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('tracking');

  const renderSection = () => {
    switch (activeSection) {
      case 'tracking':
        return (
          <section id="tracking" className="active">
            <h1>My Bus Live</h1>
            <Map />
          </section>
        );
      case 'boarding':
        return (
          <section id="boarding" className="active">
            <h1>Boarding Information</h1>
            <p>Boarded at: <span id="boarded-time">--:--</span></p>
            <p>Alighted at: <span id="alighted-time">--:--</span></p>
          </section>
        );
      case 'arrival':
        return (
          <section id="arrival" className="active">
            <h1>Estimated Arrival Time</h1>
            <p>Next Stop: <span id="next-stop">Main Street</span></p>
            <p>Estimated Arrival: <span id="eta">--:--</span></p>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Student Dashboard</h2>
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
  );
};

export default StudentDashboard;
