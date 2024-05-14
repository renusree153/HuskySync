import React, { useState } from 'react';
import NavBar from './components/Navbar';
import { useLocation } from 'react-router-dom';

function Quiz({ quizName, questions }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const quizNameParam = searchParams.get('quizName');
    const currentQuestion = questions[currentQuestionIndex];
    let answerIndex = -1; // Initialize answer index

    const questionToAsk = currentQuestion.split('\n')[0];
    console.log(questionToAsk);
    const answerChoices = currentQuestion.split('\n').slice(1).reduce((acc, choice, index) => {
        if (answerIndex === -1 && choice.startsWith('Answer:')) {
            answerIndex = index; 
        }
        if (answerIndex === -1 && choice.trim() !== '') {
            acc.push(choice); 
        }
        return acc;
    }, []);

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };

    return (
        <div className="Quiz">
            <NavBar />
            <div className="header">
                <h2 id="title">{quizNameParam}</h2>
                <div className="timer">
                    <i className="bi bi-stopwatch"></i>
                    <p>10:00 mins</p>
                </div>
                <button id="end-quiz">Exit</button>
            </div>
            <div className="quiz-content">
                <div className="question">
                    <h3>{questionToAsk}</h3>
                </div>
                <div className="answers">
                    {answerChoices.map((choice, index) => (
                        <div key={index} className="buttonBlock">
                            <button>{choice}</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="next-container">
                {currentQuestionIndex < questions.length - 1 && (
                    <button id="next" onClick={handleNextQuestion}>Next</button>
                )}
            </div>
            <div className="chat">
                <h2>Chat</h2>
            </div>
        </div>
    );
}

export default Quiz;
