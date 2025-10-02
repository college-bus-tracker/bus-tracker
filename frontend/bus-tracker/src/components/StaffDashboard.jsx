import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Map from './Map';

const TeacherDashboard = () => {
  const [activeSection, setActiveSection] = useState('tracking');

  const renderSection = () => {
    switch (activeSection) {
      case 'tracking':
        return (
          <section id="tracking" className="active">
            <h1>Live Bus Tracking</h1>
            <Map />
          </section>
        );
      case 'emergency':
        return (
          <section id="emergency" className="active">
            <h1>Emergency Alerts</h1>
            <p>No current alerts.</p>
          </section>
        );
      case 'bus-condition':
        return (
          <section id="bus-condition" className="active">
            <h1>Bus Condition</h1>
            <p>Status: <span className="status">Good ✅</span></p>
            <p>Last Maintenance: 2024-05-01</p>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Teacher Dashboard</h2>
        <ul>
          <li><button onClick={() => setActiveSection('tracking')} className={activeSection === 'tracking' ? 'active' : ''}>Bus Tracking</button></li>
          <li><button onClick={() => setActiveSection('emergency')} className={activeSection === 'emergency' ? 'active' : ''}>Emergency Alerts</button></li>
          <li><button onClick={() => setActiveSection('bus-condition')} className={activeSection === 'bus-condition' ? 'active' : ''}>Bus Condition</button></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </aside>

      <main className="main-content">
        {renderSection()}
      </main>
    </div>
  );
};

export default TeacherDashboard;
