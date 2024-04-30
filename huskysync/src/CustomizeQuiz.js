import './CustomizeQuiz.css';
import React from 'react';
import { useState } from 'react';
import NavBar from './components/Navbar';
import { Link } from 'react-router-dom';

function CustomizeQuiz() {
    const [numQuestions, setNumQuestions] = useState('5'); // Default to 5 questions

    const handleNumQuestionsChange = (event) => {
        setNumQuestions(event.target.value);
    };

    return (
        <div>
            <div className="header">
                <h2 id="custom-quiz-title">PHYS 121: Electromagnetism</h2>
            </div>
            <div className='header'>
                <h2 id="titlet"> Questions</h2>
            </div>
            <div className="settings-container">
                <div className="settings">
                    <div className="setting-item">
                        <label>How Many?</label>
                        <select value={numQuestions} onChange={handleNumQuestionsChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>

                    <div className="setting-item">
                        <label>What Type?</label>
                        <div>
                            <input
                                type="checkbox"
                                id="trueOrFalse"
                                value="TrueOrFalse"
                                // Add checked logic here if needed
                            />
                            <label htmlFor="trueOrFalse">True or False</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="multipleChoice"
                                value="MultipleChoice"
                                // Add checked logic here if needed
                            />
                            <label htmlFor="multipleChoice">Multiple Choice</label>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" className="save-btn">Create</button>
        </div>
    );
}

export default CustomizeQuiz;