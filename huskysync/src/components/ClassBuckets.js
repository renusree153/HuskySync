
import './Team.css';
import React from 'react';
import { useState, useEffect } from 'react';
import awsconfig from '../aws-exports';
import {Route, Routes} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import QuizBlock from './QuizBlock';
import { listClasses } from '../graphql/queries';
import { listQuizzes } from '../graphql/queries';

function ClassBucket({ class: classObj, quizzes }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const [listOfQuizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const pullData = async () => {
          let data = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'X-Api-Key': awsconfig.aws_appsync_apiKey
            },
            body: JSON.stringify({
              query: listQuizzes
            })
          })
          data = await data.json();
          setQuizzes(data);
        }
        pullData()
    }, []);

  const getQuizzesForClass = (classId) => {
    // Assuming 'quizzes' holds all quizzes and 'class' is the property within a class object
    return listOfQuizzes.filter((quiz) => quiz.class === classId);
  };

  const getNumberOfQuizzes = () => {
    // Implement logic to count quizzes based on classObj or quizzes array (if provided)
    return quizzes?.length || 0; // Use optional chaining to handle potential undefined quizzes
  };

  return (
    <div className="container">
      <div className="horizontal-bar">
        <div className="bar">
          <h4>{classObj.name}</h4>
          <div className="text-right-bottom">
            <p className="small-text">{getNumberOfQuizzes()} Quizzes</p>
          </div>
          <button onClick={toggleExpand}>
            {expanded ? (
              <i className="bi bi-caret-up-fill"></i>
            ) : (
              <i className="bi bi-caret-down-fill"></i>
            )}
          </button>
        </div>
        {expanded && (
          <div className="expanded-content">
            <div className="h2-container">
              <div>
                {/* Class details can go here */}
              </div>
            </div>
            <h4>Quizzes</h4>
            {quizzes?.map((quiz) => (
              <QuizBlock key={quiz.id} quizData={quiz} /> // Render each quiz
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassBucket;
