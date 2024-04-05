
import './Team.css';
import React from 'react';
import { useState } from 'react';
import {Route, Routes} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

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
                <p className="small-text">10 Members</p>
            </div>
            <button onClick={toggleExpand}>
                {expanded ? '-' : '+'}
            </button>
            </div>
            {expanded && (
            <div className="expanded-content">
                <p>This is the expanded content.</p>
            </div>
            )}
        </div>
      </div>
    );
  }
  
  export default Team;