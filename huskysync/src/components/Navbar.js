import React from 'react';
import { useState } from 'react';
import './Navbar.css';

function NavBar() {
    return (
        <nav className="navbar">
            <ul className="nav-items">
                <li>Home</li>
                <li>Groups</li>
                <li>Plan</li>
                <li>Create Quiz</li>
            </ul>
        </nav>
    )
}

export default NavBar;