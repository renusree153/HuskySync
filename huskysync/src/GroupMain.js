import React from "react";
import './GroupMain.css';
import { useState } from 'react';
import NavBar from './components/Navbar';

function GroupMain() {
    return (
        <div className="splitContainer">
            <div class="left-panel">
                <h2>Classes</h2>
                <select className="dropdown">
                    <select id="classselect"></select>
                    <option value="select">Select</option>
                    <option value="bio">BIO 180</option>
                    <option value="math126">MATH 126</option>
                    <option value="chem142">CHEM 142</option>
                    <option value="bio200">BIO 200</option>
                </select>
            </div>
            <div class="line"></div>
            <div class="right-panel">
                <h2>Groups</h2>
            </div>
        </div>
    )
}

export default GroupMain;