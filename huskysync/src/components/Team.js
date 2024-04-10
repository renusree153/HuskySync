
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
                <p className="small-text">2 Groups</p>
            </div>
            <button onClick={toggleExpand}>
                {expanded ? '-' : '+'}
            </button>
            </div>
            {expanded && (
            <div className="expanded-content h2-container">
                <h2>Cardio</h2>
                <h2>2/21/24 </h2>
                <h2> 6:30PM </h2>
                <div className='tags'>
                <p> Tags: cardiovascular, bloodstream, vessels</p>
                </div>
            </div>
            )}
        </div>
      </div>
    );
  }
  
  export default Team;