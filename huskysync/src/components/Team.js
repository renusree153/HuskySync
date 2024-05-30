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
import { useContext } from 'react';
import { listUsers } from '../graphql/queries';
import { UserContext } from './UserContext';
import { updateUsers } from '../graphql/mutations';

function Team () {
    const { quizName, setQuizName, selectedClass, setSelectedClass, tags, setTags, date, setDate, time, setTime, uploaderKey, setUploaderKey, showCustomizeQuiz, setShowCustomizeQuiz } = useQuiz();
    const [classStates, setClassStates] = useState({});
    const [userID, setUserId] = useState(null);
    const { username } = useContext(UserContext); 
    const [userProps, setUserProps] = useState(null);
    const [addedQuizzes, setAddedQuizzes] = useState([]);
    const [prevQuizName, setPrevQuizName] = useState(null);
    let quizToClassMapping = {};

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

    const updateUserRSVPQuizzes = async () => {
        const getUserId = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-Api-Key': awsconfig.aws_appsync_apiKey
            },
            body: JSON.stringify({
                query: listUsers
            })
        });
        const response = await getUserId.json();
        const fetchData = response.data.listUsers;
        for (let i = 0; i < fetchData.items.length; i++) {
            if (fetchData.items[i].username === username) {
                setUserProps(fetchData.items[i]);
                setUserId(fetchData.items[i].id);
                break;
            }
        }
    }

    useEffect(() => {
        if (quizName !== prevQuizName) {
        const fetchDataAndUpdate = async () => {
            if (userID && userProps && quizName) {
                console.log("USER PROPS ARE ", userProps);
                const existingQuizzes = userProps.rsvpquizzes || [];
                if (!existingQuizzes.includes(quizName)) {
                    const updatedQuizzes = [...existingQuizzes, quizName];
                    const variables = {
                        input: {
                            id: userID,
                            rsvpquizzes: updatedQuizzes
                        }
                    };
                    try {
                        const updateResponse = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                                'X-Api-Key': awsconfig.aws_appsync_apiKey
                            },
                            body: JSON.stringify({
                                query: updateUsers,
                                variables: variables
                            })
                        });
                        
                        if (!updateResponse.ok) {
                            throw new Error('Failed to update user quizzes');
                        }
            
                        setPrevQuizName(quizName);
                        console.log('User quizzes updated successfully');
                    } catch (error) {
                        console.error('Error updating user quizzes:', error);
                    }
                }
            }
        };
        fetchDataAndUpdate(); 
        }
    
    }, [userID, quizName, prevQuizName]);

    const handleJoin = (quizname) => {
        setQuizName(quizname);
    }

    useEffect (() => {
        console.log("new quiz name from handle join ", quizName);
        updateUserRSVPQuizzes();
    }, [])

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

    useEffect (() => {
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
            console.log(data);
            setQuizzes(data.data.listQuizzes.items);
            if (data && data.data && data.data.listQuizzes && data.data.listQuizzes.items) {
                for (let i = 0; i < data.data.listQuizzes.items.length; i++) {
                    let dataItem = data.data.listQuizzes.items[i];
                    const quizName = dataItem.quizname;
                    const quizClass = dataItem.class;
                    if (!(quizClass in quizToClassMapping)) {
                        quizToClassMapping[quizClass] = [quizName];
                    } else {
                        quizToClassMapping[quizClass].push(quizName);
                    }
                }
                console.log(quizToClassMapping);
            }
          }
          pullData()
    }, [listOfQuizzes])

    return (
        <div className="container">
            <div className="horizontal-bar">
                {listOfClasses
                .filter(classObj => classObj.name !== null) 
                .map((classObj) => (
                    <div key={classObj.id} className="bar">
                        <h4>{classObj.name}</h4>
                        <div className="text-right-bottom">
                            <p className="small-text">2 quizzes</p>
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
                                        <div className='tags'>
                                            <i className="bi bi-tags"></i>
                                            <p>{item.tags && item.tags.join(', ')}</p>
                                        </div>
                                    </div>
                                    <div className="date-time-container">
                                        <h4 className="date-time">{item.date} {item.time}</h4>
                                        <Link to={`/upload?quizName=${encodeURIComponent(item.quizname)}`}>
                                            <button id="newbtn" onClick={() => handleJoin(item.quizname)}>
                                                <i className="bi bi-plus"></i>
                                            </button>
                                        </Link>
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