import './CustomizeQuiz.css';
import React from 'react';
import { useState } from 'react';
import NavBar from './components/Navbar';
import { Link } from 'react-router-dom';
import { useQuiz } from './components/QuizContext';

function CustomizeQuiz() {
    const [numQuestions, setNumQuestions] = useState('5'); 
    const { quizName, setQuizName, selectedClass, setSelectedClass, tags, setTags, date, setDate, time, setTime, setUploaderKey, showCustomizeQuiz, setShowCustomizeQuiz } = useQuiz();

    const handleNumQuestionsChange = (event) => {
        setNumQuestions(event.target.value);
    };

    const [quizLength, setQuizLength] = useState('10'); 

    const handleQuizLengthChange = (event) => {
        setQuizLength(event.target.value);
    };

    return (
        <div>
            <br></br>
            <h2> {selectedClass}, {quizName}, {tags}, {date}</h2>
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
                                value="TrueOrFalse"                            />
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