import React from "react";
import './GroupMain.css';
import { useState } from 'react';
import NavBar from './components/Navbar';
import {Multiselect} from 'multiselect-react-dropdown';
import Team from "./components/Team";

function GroupMain() {
    const data = [
        {Class: 'BIO 180', id:1},
        {Class: 'MATH 126', id:2}, 
        {Class: 'MATH 125', id:3}, 
        {Class: 'CHEM 142', id:4}, 
        {Class: 'MATH 126', id:5}, 
    ]
    return (
        <div className="splitContainer">
            <NavBar/>
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
                <h2>Quizzes</h2>
                <button id="joinlive">RSVP'd</button>
                <button id="creategroup">Join</button>
                <hr id="hrgroups"></hr>
                <Team />
                <Team />
            </div>
        </div>
    )
}

export default GroupMain;