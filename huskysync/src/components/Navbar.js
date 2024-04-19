import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Button, useAuthenticator } from '@aws-amplify/ui-react';

function NavBar() {
  const { signOut, user } = useAuthenticator();

  return (
    <div id="fullnavbar">
      <nav className="navbar">
        <ul className="nav-items">
          <li className="link">
            <Link to="/Home">
              <p className="labels">Home</p>
            </Link>
          </li>
          <li className="link">
            <Link to="/GroupMain">
              <p className="labels">Quiz</p>
            </Link>
          </li>
          <li className="link">
            <Link to="/FAQ">
              <p className="labels">FAQ</p>
            </Link>
          </li>
          <li className="link">
            <Link to="/Settings">
              <p className="labels">Settings</p>
            </Link>
          </li>
          {user && (
            <li className="link">
              <Button onClick={signOut}>Signout</Button>
            </li>
          )}
        </ul>
      </nav>
      <div id="horizontal-line"></div>
    </div>
  );
}

export default NavBar;
