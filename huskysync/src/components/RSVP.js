import './Team.css';
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import awsconfig from '../aws-exports';
import {Route, Routes} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import {QuizBlock} from './QuizBlock';
import {useNavigate} from 'react-router-dom';
import { rsvpQuizzesForUser } from '../graphql/queries';
import { listClasses } from '../graphql/queries';
import { listUsers } from '../graphql/queries';
import { listQuizzes } from '../graphql/queries';
import { getCurrentUser } from '@aws-amplify/auth';
import { UserContext } from './UserContext';

function Rsvp (props) {
    const [classStates, setClassStates] = useState({});
    const [userId, setUserId] = useState(null); 
    const [listOfClasses, setClasses] = useState([]);
    const [listOfQuizzes, setQuizzes] = useState([]);
    const [fetchData, setFetchData] = useState(null);
    const { username } = useContext(UserContext); 

    // Fetch user ID
    useEffect(() => {
        console.log("in useEffect of rsvp to fetch userId");
        const pullData = async () => {
            let response = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Api-Key': awsconfig.aws_appsync_apiKey
                },
                body: JSON.stringify({ query: listUsers })
            });
            let data = await response.json();
            if (data && data.data && data.data.listUsers) {
                console.log(data.data.listUsers);
                setFetchData(data.data.listUsers);

            } else {
                console.error('Invalid data structure:', data);
            }
        };
        pullData();
    }, [username]); 

    useEffect (() => {
        const pullData = async () => {
            let response = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Api-Key': awsconfig.aws_appsync_apiKey
                },
                body: JSON.stringify({ query: listQuizzes })
            });
            let data = await response.json();
            if (data && data.data && data.data.listQuizzes) {
                console.log(data);
                setQuizzes(data.data.listQuizzes.items);
            } else {
                console.error('Invalid data structure:', data);
            }
        };
        pullData();
    })

    useEffect(() => {
        if (fetchData && fetchData.items) {
            for (let i = 0; i < fetchData.items.length; i++) {
                if (fetchData.items[i].username === username) {
                    setUserId(fetchData.items[i].id);
                }
            }
        }
    }, [fetchData, username]);

    useEffect(() => {
        if (userId) { 
            console.log("in useEffect of rsvp to fetch quizzes for user", userId);
            const pullData2 = async () => {
                let response = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'X-Api-Key': awsconfig.aws_appsync_apiKey
                    },
                    body: JSON.stringify({
                        query: rsvpQuizzesForUser,
                        variables: {id: userId}
                    })
                });
                let data2 = await response.json();
                setClasses(data2.data.getUsers.rsvpquizzes); 
            };
            pullData2();
        }
    }, [userId]); 

    return (
        <div className="container">
            <div className="horizontal-bar">
                {listOfClasses.filter((classObj) => classObj !== null)
                .map((classObj) => (
                    <div key={classObj.id} className="bar">
                        <h4>{classObj}</h4>
                        {listOfQuizzes.filter(quiz => quiz.quizname === classObj).map(quiz => (
                            <p key={quiz.id}>Quiz on: {quiz.date}  at {quiz.time}</p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
    }    
  
  export default Rsvp;

  /*
  Get list of quizzes:

  query listQuizzes

  loop thru all quizzes and check where quizname == classes.name 

  */