import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Button, useAuthenticator } from '@aws-amplify/ui-react';

function NavBar() {
  const { signOut, user } = useAuthenticator();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="fullnavbar">
      <nav className="navbar">
        <ul className="nav-items">
          <li className="link">
            <Link to="/Home">
              <p className="labels"> Home </p>
            </Link>
          </li>
          <li className="link">
            <Link to="/GroupMain">
              <p className="labels"> Quiz </p>
            </Link>
          </li>

          <li className="link dropdown" onClick={handleDropdownToggle}>
            <p className="labels" id="profile"> Profile </p>
            {showDropdown && (
                <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <Link to="/Settings">
                    <p className="account">Account</p>
                  </Link>
                </li>
                <li className="dropdown-item">
                  {user && (
                    <Button onClick={signOut}>Signout</Button>
                  )}
                </li>
                </ul>
            )}
        </li>

        </ul>
      </nav>
      <div id="horizontal-line"></div>
    </div>
  );
}

export default NavBar;
