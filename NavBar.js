import React from 'react';
import { Link } from 'react-router-dom';
import './assets/Styles/NavBar.css';

function NavBar({ title, link1, link2, link3, linkText1, linkText2, linkText3, titleName, onLogout }) {
  return (
    <nav className="navbar1">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link className='navTitle' to={titleName}>{title}</Link>
        </div>
        <div className="navbar-links">
          {link1 && <Link to={link1} className="navbar-link">{linkText1}</Link>}
         { link2 && <Link to={link2} className="navbar-link">{linkText2}</Link>}
          
          {/* Render logout button if onLogout is passed */}
          {linkText3 && onLogout && (
            <button onClick={onLogout} className="navbar-link ">
              {linkText3} {/* This will display "Logout" */}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
