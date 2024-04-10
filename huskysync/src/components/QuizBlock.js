import React, {useState, useEffect} from 'react';
import awsconfig from '../aws-exports';
import './QuizBlock.css';

const QuizBlock = () => {
    return (
        <div className="quiz-block">
            <h2>Cardio</h2>
            <h2>2/21/24 6:30PM</h2>
            <h2>Tags: Cardiovascular, Bloodstream</h2>
        </div>
    )
}

export default QuizBlock;