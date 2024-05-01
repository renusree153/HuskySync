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

    const [quizLength, setQuizLength] = useState('10'); // Default to 10 minutes

    const handleQuizLengthChange = (event) => {
        setQuizLength(event.target.value);
    };

    return (
        <div>
            <div className="header">
                <h2 id="custom-quiz-title">PHYS 121: Electromagnetism</h2>
            </div>
            <div className='header'>
                <h2 id="titlet"> Customization:</h2>
            </div>
            <div className="settings-container create-quiz-container">
                <div className="settings">
                    <div className="setting-item">
                        <label>How Many Questions?</label>
                        <select value={numQuestions} onChange={handleNumQuestionsChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>

                    <div className="setting-item">
                        <label>How Many Minutes?</label>
                        <select value={quizLength} onChange={handleQuizLengthChange}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                        </select>
                    </div>

                    <div className="setting-item">
                        <label>What Types of Questions?</label>
                        <div > 
                        <div>
                            <input
                                type="checkbox"
                                id="trueOrFalse"
                                value="TrueOrFalse"
                                // Add checked logic here if needed
                            />
                            <label htmlFor="trueOrFalse">True or False</label>
                        </div>
                        <div className="align">
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
            </div>
            <button type="submit" className="save-btn">Create</button>
        </div>
    );
}

export default CustomizeQuiz;