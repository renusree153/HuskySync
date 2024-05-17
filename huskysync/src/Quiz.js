import React, { useState } from 'react';
import NavBar from './components/Navbar';
import { useLocation } from 'react-router-dom';

function Quiz({ quizName, questions, answers }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedOptionText, setSelectedOptionText] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const quizNameParam = searchParams.get('quizName');
  const currentQuestion = questions[currentQuestionIndex];
  let answerIndex = -1;
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

    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers.push(selectedOption);
    setSelectedAnswers(newSelectedAnswers);
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1; // Check for last question

  const handleSubmitQuiz = () => {
    // Handle quiz submission logic here (e.g., send answers to server)
    console.log("Submitted answers:", selectedAnswers);
    // You can potentially reset the quiz state or navigate to a different page
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
        {currentQuestionIndex < questions.length - 1 && ( // Only show "Next" for non-last questions
          <button id="next" onClick={handleNextQuestion}>Next</button>
        )}
        {isLastQuestion && ( // Only show "Done" for the last question
          <button id="done" onClick={handleSubmitQuiz}>Done</button>
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

    </div>
  );
}

export default Quiz;