import React from 'react';
import { useState } from 'react';
import './Navbar.css';
import GroupMain from "../GroupMain.js";
import Home from '../Home';
import Settings from '../Settings';
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import { useAuthenticator, withAuthenticator, Button } from '@aws-amplify/ui-react';

function NavBar() {
    const { signOut } = useAuthenticator((context) => [context.signOut])

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
                    <li >
                    <div style={{ marginLeft: 'auto' }}>
                    <Button style={{ outline: 'none', boxShadow: 'none' }}>Log Out</Button>
                    </div>


                        
                    </li>
                </ul>
            </nav>
            <div id="horizontal-line"></div>
        </div>
    )
}

export default NavBar;