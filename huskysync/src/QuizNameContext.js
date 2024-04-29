import React, { createContext, useState } from 'react';

export const QuizNameContext = createContext();

export const QuizNameProvider = ({ children }) => {
    const [quizName, setQuizName] = useState('');

    return (
        <QuizNameContext.Provider value={{ quizName, setQuizName }}>
            {children}
        </QuizNameContext.Provider>
    );
};


export default QuizNameProvider;