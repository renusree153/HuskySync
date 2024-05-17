import React, { createContext, useState, useContext } from 'react';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
    const [quizName, setQuizName] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [tags, setTags] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [uploaderKey, setUploaderKey] = useState(0);
    const [showCustomizeQuiz, setShowCustomizeQuiz] = useState(false);
    const [showQuizCreated, setShowQuizCreated] = useState(false);

    return (
        <QuizContext.Provider value={{
            quizName, setQuizName,
            selectedClass, setSelectedClass,
            tags, setTags,
            date, setDate,
            time, setTime,
            uploaderKey, setUploaderKey,
            showCustomizeQuiz, setShowCustomizeQuiz,
            showQuizCreated, setShowQuizCreated
        }}>
            {children}
        </QuizContext.Provider>
    );
};
