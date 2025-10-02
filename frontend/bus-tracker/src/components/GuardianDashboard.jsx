import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Map from './Map';

const ParentDashboard = () => {
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
      case 'driver':
        return (
          <section id="driver" className="active">
            <h1>Driver Information</h1>
            <p><strong>Name:</strong> Ramesh Kumar</p>
            <p><strong>Phone:</strong> +91 9876543210</p>
            <p><strong>Bus No:</strong> UP16 AB 1234</p>
          </section>
        );
      case 'fees':
        return (
          <section id="fees" className="active">
            <h1>Bus Fee Management</h1>
            <p>Status: <span className="status">Paid ✅</span></p>
            <button className="btn">Download Receipt</button>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Parent Dashboard</h2>
        <ul>
          <li><button onClick={() => setActiveSection('tracking')} className={activeSection === 'tracking' ? 'active' : ''}>Live Tracking</button></li>
          <li><button onClick={() => setActiveSection('driver')} className={activeSection === 'driver' ? 'active' : ''}>Driver Info</button></li>
          <li><button onClick={() => setActiveSection('fees')} className={activeSection === 'fees' ? 'active' : ''}>Bus Fee</button></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </aside>

      <main className="main-content">
        {renderSection()}
      </main>
    </div>
  );
};

export default ParentDashboard;
