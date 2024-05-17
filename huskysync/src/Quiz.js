import React, { useState } from 'react';
import NavBar from './components/Navbar';
import { useLocation } from 'react-router-dom';

function Quiz({ quizName, questions, answers }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedOptionText, setSelectedOptionText] = useState('');
  const location = useLocation();
  const [finalScore, setFinalScore] = useState(null);
  const [done, setDone] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const quizNameParam = searchParams.get('quizName');
  const currentQuestion = questions[currentQuestionIndex];
  let answerIndex = -1;
  let score = 0;
  const [quizDone, setQuizDone] = useState(false);
  const questionToAsk = currentQuestion.split('\n')[0];
  const answerChoices = currentQuestion.split('\n').slice(1).reduce((acc, choice, index) => {
    if (answerIndex === -1 && choice.startsWith('Answer:')) {
      answerIndex = index;
    }
    if (answerIndex === -1 && choice.trim() !== '') {
      acc.push(choice);
    }
    return acc;
  }, []);

  console.log("answers AREEE ", answers);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handleAnswerSelection = (index) => {
    setSelectedAnswerIndex(index);
    const selectedOption = answerChoices[index];
    setSelectedOptionText(selectedOption);
  
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setSelectedAnswers(updatedAnswers);
    console.log(selectedAnswers);
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1; 

  const handleSubmitQuiz = () => {
    for (let i = 0; i < selectedAnswers.length; i++) {
        if (selectedAnswers[i].trim() === answers[i].trim()) {
            score += 1;
        }
    }
    setFinalScore(score);
    setQuizDone(true);
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
            <div key={index} className={`buttonBlock ${selectedAnswerIndex === index ? 'selected' : ''}`}>
              <button onClick={() => handleAnswerSelection(index)}>{choice}</button>
            </div>
          ))}
        </div>
      </div>
      <div className="next-container">
        {currentQuestionIndex < questions.length - 1 && ( 
          <button id="next" onClick={handleNextQuestion}>Next</button>
        )}
        {isLastQuestion && ( 
          <button id="done" onClick={() => {handleSubmitQuiz(); setDone(true);}}>Done</button>
        )}
      </div>
      <div className="chat">
        <h2>Chat</h2>
      </div>
      <div className="selected-option">
        {selectedOptionText && (
          <h3>Currently selected option: {selectedOptionText}</h3>
        )}
      </div>
      <div className="Quiz">
        {done && quizDone && (
        <div className="score">
            <h3>Your Score: {finalScore} out of {questions.length}</h3>
        </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;