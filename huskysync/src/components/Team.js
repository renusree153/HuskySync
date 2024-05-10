import './Team.css';
import React from 'react';
import { useState, useEffect } from 'react';
import awsconfig from '../aws-exports';
import {Route, Routes} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import {QuizBlock} from './QuizBlock';
import { listClasses } from '../graphql/queries';
import { listQuizzes } from '../graphql/queries';
import {useNavigate} from 'react-router-dom';
import { useQuiz } from './QuizContext';
import { Link } from 'react-router-dom';

function Team () {
    console.log("hello from team.js file ");
    const { quizName, setQuizName, selectedClass, setSelectedClass, tags, setTags, date, setDate, time, setTime, uploaderKey, setUploaderKey, showCustomizeQuiz, setShowCustomizeQuiz } = useQuiz();
    const [classStates, setClassStates] = useState({});

    const toggleExpand = (classId) => {
        setClassStates(prevState => ({
            ...prevState,
            [classId]: !prevState[classId]
        }));
    };

    const [listOfClasses, setClasses] = useState([]);

    useEffect(() => {
        console.log("in team.js useffect");
        const pullData = async () => {
          let data = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'X-Api-Key': awsconfig.aws_appsync_apiKey
            },
            body: JSON.stringify({
              query: listClasses
            })
          })
          data = await data.json();
          setClasses(data.data.listClasses.items);
        }
        pullData()
    }, []);

    const [listOfQuizzes, setQuizzes] = useState([]);

    const handlePlusClick = (quizname) => {
        setQuizName(quizname);
        console.log("new quiz name is ", quizName);
    }

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
          setQuizzes(data.data.listQuizzes.items);
        }
        pullData()
    }, []);
    
    return (
        <div className="container">
            <div className="horizontal-bar">
                {listOfClasses.map((classObj) => (
                    <div key={classObj.id} className="bar">
                        <h4>{classObj.name}</h4>
                    
                        <div className="text-right-bottom">
                            <p className="small-text">2 Quizzes</p>
                        </div>
                        <button onClick={() => toggleExpand(classObj.id)}>
                            {classStates[classObj.id] ? (
                                <i className="bi bi-caret-up-fill"></i>
                            ) : (
                                <i className="bi bi-caret-down-fill"></i>
                            )}
                        </button>
                    </div>
                ))}
            </div>
            {listOfClasses.map((classObj) => (
            classStates[classObj.id] && (
                <div key={`expanded-${classObj.id}`} className="expanded-content">
                    <div className="h2-container">
                        <div className="scrollable-container bottom">
                            {listOfQuizzes
                            .filter((item) => item.class === classObj.name)
                            .map((item) => (
                                <div key={item.id}>
                                    <div className="quiz-container">
                                        <h4 className="quiz-title">{item.quizname}</h4>
                                        <div className="date-time-container">
                                            <h4 className="date-time">{item.date} {item.time}</h4>
                                            <Link to={`/upload?quizName=${encodeURIComponent(item.quizname)}`}>
                                                <i className="bi bi-plus"></i>
                                            </Link>
                                        </div>
                                    </div>
                                <div className='tags'>
                                    <i className="bi bi-tags"></i>
                                    <p>{item.tags && item.tags.join(', ')}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
            ))}
        </div>
    );
}    
export default Team;