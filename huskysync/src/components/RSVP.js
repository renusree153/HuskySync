import './Team.css';
import React from 'react';
import { useState, useEffect } from 'react';
import awsconfig from '../aws-exports';
import {Route, Routes} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import {QuizBlock} from './QuizBlock';
import {useNavigate} from 'react-router-dom';
import { rsvpQuizzesForUser } from '../graphql/queries';


function Rsvp (props) {
    const navigate = useNavigate();

    const handleMove = () => {
        navigate('../Upload');
    }
    const [classStates, setClassStates] = useState({});

    const toggleExpand = (classId) => {
        setClassStates(prevState => ({
            ...prevState,
            [classId]: !prevState[classId]
        }));
    };

    const [listOfClasses, setClasses] = useState([]);

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
              query: rsvpQuizzesForUser
            })
          })
          data = await data.json();
          setClasses(data.data.getUsers.rsvpquizzes);
        }
        pullData()
    }, []);

    const [listOfQuizzes, setQuizzes] = useState([]);

   console.log("HELLLOOO FROM RSVPPPP");
    
    return (
        <div className="container">
            <div className="horizontal-bar">
                {listOfClasses.filter((classObj) => classObj !== null)
                .map((classObj) => (
                    <div key={classObj.id} className="bar">
                        <h4>{classObj}</h4>
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
    .map((item) => (
        <div key={item.id}>
            <div className="quiz-container">
                <h4 className="quiz-title">{item.rsvpquizzes}</h4>
                <div className="date-time-container">
                    <h4 className="date-time">{item.date} {item.time}</h4>
                    <a href="/Upload">
                        <i className="bi bi-plus-circle plus-icon"></i>
                    </a>
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
  
  export default Rsvp;
