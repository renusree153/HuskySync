import React from 'react';
import { useState } from 'react';
import './Navbar.css';
import GroupMain from "../GroupMain.js";
import Home from '../Home';
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar">
            <ul className="nav-items">
                <li>
                    <Link to="/Home">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/GroupMain">
                        Groups
                    </Link>
                </li>
                <li>
                    <Link to="/GroupMain">
                        Plan
                    </Link>
                </li>
                <li>
                    <Link to="/GroupMain">
                        Quiz
                    </Link>
                </li>
                <li>
                    <Link to="/GroupMain">
                        FAQ
                    </Link>
                </li>
                <li>
                    <img src="imgs/profile.png" alt="Profile Page"/>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;