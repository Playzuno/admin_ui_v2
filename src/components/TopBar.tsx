// import React from 'react';
import { Link } from 'react-router-dom';

export function Topbar() {
  const navItems = [
    { id: 1, icon: '📋', label: 'Dashboard' },
    { id: 2, icon: '👥', label: 'Users' },
    { id: 3, icon: '⚙️', label: 'Settings' },
    { id: 4, icon: '🛍️', label: 'Products' },
    { id: 5, icon: '📊', label: 'Reports' },
    { id: 6, icon: '🔔', label: 'Notifications' },
    { id: 7, icon: '🌐', label: 'Language' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 px-4 border-bottom">
      <Link className="navbar-brand mr-5" to="/">
        <img src="/src/assets/images/logo.svg" alt="Zuno Logo" style={{ height: '35px' }} />
      </Link>

      <div className="d-flex align-items-center justify-content-between flex-grow-1">
        <div className="nav-icons d-flex">
          {navItems.map(item => (
            <div
              key={item.id}
              className="nav-item mx-2 d-flex align-items-center justify-content-center"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#FFF5F0',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
            </div>
          ))}
        </div>

        <div className="user-profile d-flex align-items-center">
          <img
            src="https://raw.githubusercontent.com/Playzuno/admin_ui_v2/main/public/avatar.png"
            alt="User Avatar"
            className="rounded-circle mr-3"
            style={{ width: '40px', height: '40px' }}
          />
          <div className="user-info">
            <div className="text-purple font-weight-bold">User Name</div>
            <div className="text-muted small">Lorem Ipsum</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
