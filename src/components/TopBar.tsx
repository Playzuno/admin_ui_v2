// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Topbar() {
  const navItems = [
    { id: 1, icon: '📋', label: 'Dashboard', path: '/' },
    { id: 2, icon: '👥', label: 'Roles', path: '/roles' },
    { id: 3, icon: '🛍️', label: 'Products', path: '/products' },
    { id: 4, icon: '⚙️', label: 'Settings', path: '/settings' },
    { id: 5, icon: '📊', label: 'Reports', path: '/reports' },
    { id: 6, icon: '🔔', label: 'Notifications', path: '/notifications' },
    { id: 7, icon: '🌐', label: 'Language', path: '/language' },
  ];
  const navigate = useNavigate(); // Add this line

  const handleNavItemClick = item => {
    navigate(item.path);
  };

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
              onClick={() => handleNavItemClick(item)}
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
