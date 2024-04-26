import './CustomizeQuiz.css';
import React from 'react';
import { useState } from 'react';
import NavBar from './components/Navbar';
import { Link } from 'react-router-dom';

function CustomizeQuiz() {
    const [TorF, setTorF] = useState(false);
    const [quizSettings, setQuizSettings] = useState('multipleChoice');


    const handleQuizSettingChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setQuizSettings([...quizSettings, value]);
        } else {
            setQuizSettings(quizSettings.filter(setting => setting !== value));
        }
    };

    return (
        <div className="Quiz">
            <NavBar/>
            <div className="header">
                <h2 id="title">PHYS 121: Electromagnetism</h2>
                <button id="end-quiz">Exit</button>
            </div>
            <div className='header'>
                <h2 id="titlet"> 3. Questions</h2>
            </div>
            <div className="settings-container">
            <div className="settings">
            <div className="setting-item">
                    <label>How Many Questions?</label>
                    <select value={quizSettings} onChange={handleQuizSettingChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
            </div>

            <div className="setting-item">
                <label>Type of questions?</label>
                <div>
                    <input
                        type="checkbox"
                        id="trueOrFalse"
                        value="TrueOrFalse"
                        checked={quizSettings.includes("TrueOrFalse")}
                        onChange={handleQuizSettingChange}
                    />
                    <label htmlFor="trueOrFalse">True or False</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="multipleChoice"
                        value="MultipleChoice"
                        checked={quizSettings.includes("MultipleChoice")}
                        onChange={handleQuizSettingChange}
                    />
                    <label htmlFor="multipleChoice">Multiple Choice</label>
                </div>
            </div>

            </div>
            </div>
            <div className="next-container">
                 <button id="next">I'm Ready!</button>
            </div>
            <div className="chat">
                <h2>Chat</h2>
            </div>
        </div>

    );
}

export default CustomizeQuiz;