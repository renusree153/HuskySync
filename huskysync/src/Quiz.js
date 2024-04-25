import './Quiz.css';
import React from 'react';
import { useState } from 'react';
import NavBar from './components/Navbar';
import { Link } from 'react-router-dom';

function Quiz() {
    return (
        <div className="Quiz">
            <NavBar/>
            <div className="header">
                <h2 id="title">PHYS 121: Electromagnetism</h2>
                <button id="end-quiz">End</button>
                <div className="timer">
                    <i class="bi bi-stopwatch"></i>
                    <p>09:00 mins</p>
                </div>
            </div>
            <div class="quiz-progress">
                <ul>
                    <li id="q1">1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                    <li>8</li>
                    <li>9</li>
                    <li>10</li>
                </ul>
            </div>
            <div className="quiz-content">
                <div className="question">
                    <h3>1.  Which of the following is not a fundamental force in nature?</h3>
                </div>
                <div className="answers">
                    <div class="buttonBlock">
                        <button id="buttonOptionA">A. Gravitational force</button>
                    </div>
                    <div class="buttonBlock">
                        <button id="buttonOptionB">B. Electromagnetic force</button>
                    </div>
                    <div class="buttonBlock">
                        <button id="buttonOptionC">C. Strong nuclear force</button>
                    </div>
                    <div class="buttonBlock">
                        <button id="buttonOptionD">D. Centrifugal force</button>
                    </div>
                </div>
            </div>
            <div className="next-container">
                 <button id="next">Next</button>
            </div>
            <div className="chat">
                <h2>Chat</h2>
            </div>
        </div>

    );
}

export default Quiz;