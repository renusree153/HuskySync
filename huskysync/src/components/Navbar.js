import React from 'react';
import { useState } from 'react';
import './Navbar.css';
import GroupMain from "../GroupMain.js";
import Home from '../Home';
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function NavBar() {
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
                        <p className="labels">Groups</p>
                        </Link>
                    </li>
                    <li className="link">
                        <Link to="/GroupMain">
                            <p className="labels">Plan</p>
                        </Link>
                    </li>
                    <li className="link">
                        <Link to="/GroupMain">
                            <p className="labels">Quiz</p>
                        </Link>
                    </li>
                    <li className="link">
                        <Link to="/GroupMain">
                            <p className="labels">FAQ</p>
                        </Link>
                    </li>
                    <li>
                        <img src="imgs/profile.png" alt="Profile Page"/>
                    </li>
                </ul>
            </nav>
            <div id="horizontal-line"></div>
        </div>
    )
}

export default NavBar;