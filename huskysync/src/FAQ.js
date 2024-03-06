import logo from './logo.svg';
import './FAQ.css';
import React from 'react';
import { useState } from 'react';
import NavBar from './components/Navbar';
import {Route, Routes} from "react-router-dom";
import GroupMain from "./GroupMain.js";
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

function FAQ() {
    const [username, setUsername] = useState('');
    return (
        <div className="FAQ">
          <header className="FAQ-header">
            <h1>
                FAQ
            </h1>
            <h2>
                Coming Soon.
            </h2>
  
          </header>
        </div>
    );
  }
  
  export default FAQ;

