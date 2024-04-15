
import './Team.css';
import React from 'react';
import { useState } from 'react';
import {Route, Routes} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import {QuizBlock} from './QuizBlock';

function Team() {
    const [expanded, setExpanded] = useState(false);
  
    const toggleExpand = () => {
      setExpanded(!expanded);
    };
  
    return (
      <div className="container">
        <div className="horizontal-bar">
            <div className="bar">
                <h4>BIO 180</h4>
            <div className="text-right-bottom"> 
                <p className="small-text">2 Quizzes</p>
            </div>
            <button onClick={toggleExpand}>
                {expanded ? <i class="bi bi-caret-up-fill"></i> : <i class="bi bi-caret-down-fill"></i>}
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