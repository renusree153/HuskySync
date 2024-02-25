import React from 'react';
import { useState } from 'react';
import './Navbar.css';

function NavBar() {
    return (
        <nav className="navbar">
            <ul className="nav-items">
                <li>
                    <a href="" className="liclass" id="home">
                        Home
                    </a>
                </li>
                <li>
                    <a href="" className="liclass" id="groups">
                        Groups
                    </a>
                </li>
                <li>
                    <a href="" className="liclass" id="plan">
                        Plan
                    </a>
                </li>
                <li>
                    <a href="" className="liclass" id="quiz">
                        Create Quiz
                    </a>
                </li>
                <li>
                    <a href="" className="liclass" id="faq">
                        FAQ
                    </a>
                </li>
                <li>
                    <img src="imgs/profile.png" alt="Profile Page"/>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;