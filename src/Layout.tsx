import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <nav className="main-nav">
        <ul>
          <li><Link to="/recommendation">Recommendation</Link></li>
          <li><Link to="/aquarium">Aquarium</Link></li>
          <li><Link to="/history">History</Link></li>
        </ul>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;