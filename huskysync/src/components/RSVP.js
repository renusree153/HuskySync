import React, { useState, useEffect, useContext } from 'react';
import awsconfig from '../aws-exports';
import { rsvpQuizzesForUser, listUsers, listQuizzes } from '../graphql/queries';
import { UserContext } from './UserContext';
import './RSVP.css';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Rsvp() {
    const [userId, setUserId] = useState(null);
    const [listOfClasses, setClasses] = useState([]);
    const [listOfQuizzes, setQuizzes] = useState([]);
    const [fetchData, setFetchData] = useState(null);
    const { username } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'X-Api-Key': awsconfig.aws_appsync_apiKey
                    },
                    body: JSON.stringify({ query: listUsers })
                });
                const data = await response.json();
                if (data && data.data && data.data.listUsers) {
                    setFetchData(data.data.listUsers);
                    console.log(data.data.listUsers);
                } else {
                    console.error('Invalid data structure:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [username]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'X-Api-Key': awsconfig.aws_appsync_apiKey
                    },
                    body: JSON.stringify({ query: listQuizzes })
                });
                const data = await response.json();
                if (data && data.data && data.data.listQuizzes) {
                    setQuizzes(data.data.listQuizzes.items);
                } else {
                    console.error('Invalid data structure:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (fetchData && fetchData.items) {
            for (let i = 0; i < fetchData.items.length; i++) {
                console.log(fetchData.items[i]);
                if (fetchData.items[i].username === username) {
                    console.log(userId);
                    setUserId(fetchData.items[i].id);
                    break;
                }
            }
        }
    }, [fetchData, username]);

    useEffect(() => {
        if (userId) {
            const fetchData = async () => {
                try {
                    const response = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                            'X-Api-Key': awsconfig.aws_appsync_apiKey
                        },
                        body: JSON.stringify({
                            query: rsvpQuizzesForUser,
                            variables: { id: userId }
                        })
                    });
                    const data = await response.json();
                    if (data && data.data && data.data.getUsers && data.data.getUsers.rsvpquizzes) {
                        setClasses(data.data.getUsers.rsvpquizzes);
                    } else {
                        console.error('Invalid data structure:', data);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [userId]);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('../Upload');
    };


    return (
        <div className="container">
            <div className="horizontal-bar">
                {listOfClasses.filter(classObj => classObj !== null)
                    .map(classObj => {
                        return (
                            <div key={classObj} className="bar">
                                <h4>{classObj}</h4>
                                {listOfQuizzes.filter(quiz => quiz && quiz.quizname === classObj)
                                    .map(quiz => {
                                        console.log(quiz);
                                        return (
                                            <div>
                                                <button id = "startbtn" onClick={handleClick}> Start </button>
                                                <p key={quiz.id}>Quiz on: {quiz.date} at {quiz.time}</p>
                                            </div>
                                        );
                                    })}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default Rsvp;
