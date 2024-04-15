
import './Team.css';
import React from 'react';
import { useState, useEffect } from 'react';
import {Route, Routes} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import {QuizBlock} from './QuizBlock';
import { listClasses } from '../graphql/queries';
import awsconfig from '../aws-exports';

function Team() {
    const [expanded, setExpanded] = useState(false);
  
    const toggleExpand = () => {
      setExpanded(!expanded);
    };
    const [data, setData] = useState([]);
    const [listOfClasses, setClasses] = useState([]);
// adding from groupmain to import data
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
            query: listClasses
          })
        })
        data = await data.json();
        setClasses(data.data.listClasses.items);
      }
      pullData()
  }, []);
  
    return (
      <div className="container">
        <div className="horizontal-bar">
          <div className="bar">
            <h4>{listOfClasses.length > 0 ? listOfClasses[0].name : "No classes available"}</h4>
            <div className="text-right-bottom"> 
              <p className="small-text">2 Quizzes</p>
            </div>
            <button onClick={toggleExpand}>
              {expanded ? <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-down-fill"></i>}
            </button>
          </div>
          {expanded && (
            <div className="expanded-content">
              <div className="h2-container">
                <div>
                  <h4 className="quiz-title">Cardio</h4>
                  <div className='tags'>
                    <i className="bi bi-tags"></i>
                    <p>cardiovascular, bloodstream, vessels</p>
                  </div>
                </div>
                <h4 className="date-time">2/21/24 6:30PM</h4>
              </div>
            </div>
          )}
        </div>
      </div>
    );
    
  }
  
  export default Team;


