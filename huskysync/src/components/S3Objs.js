import React, { createContext, useContext, useState } from 'react';

const S3ObjsContext = createContext();

export const useS3Objs = () => useContext(S3ObjsContext);

export const S3ObjsProvider = ({ children }) => {
    const [s3Objs, setS3Objs] = useState([]);
    const [numQuestions, setNumQuestions] = useState(5);
    const [timeLimit, setTimeLimit] = useState(10);
    const [questionType, setQuestionType] = useState(['multiple choice']);

    const addQuestionType = (type) => {
        if (!questionType.includes(type)) {
            setQuestionType([...questionType, type]);
        }
    };

    const removeQuestionType = (type) => {
        setQuestionType(questionType.filter(t => t !== type));
    };

    return (
        <S3ObjsContext.Provider value={{ 
            s3Objs, 
            setS3Objs,
            numQuestions, 
            setNumQuestions,
            timeLimit,
            setTimeLimit,
            questionType,
            setQuestionType 
            }}>
            {children}
        </S3ObjsContext.Provider>
    );
};