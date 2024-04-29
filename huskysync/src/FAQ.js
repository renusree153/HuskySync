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
    <div>
      <NavBar />
      <header className="FAQ-header">
          <h1>
            We know studying can be hard, and we want to help!
          </h1>
      </header>
      <div className="demo-title">
        <h2>
          Quizzes
        </h2>
          <ul className='bold-list'> How do I create one? </ul>
            <p className="demoo-title"> On the left hand of the quiz page, enter the details of the quiz you would like to create. 
            Click 'Create' and promptly upload your study notes.</p>
          <ul className='bold-list'> If I create a quiz, am I responsible for anything else? </ul>
            <p className="demoo-title"> No! After you create a quiz, you are free to take it as if someone else created it. This means 
            it’s totally okay if you are not able to make it. At the end of the day, your quiz will help other classmates study as well!</p>
          <ul className='bold-list'> Are my quizzes public? </ul>
            <p className="demoo-title"> Yes, all quizzes are inherently public to allow other users access to study material.</p>
        <h2>
          Privacy
        </h2>
          <ul className='bold-list'> Are my notes that I upload kept private? </ul>
            <p className="demoo-title"> The notes you upload cannot be viewed by anyone else. However, our algorithm does access the information in your PDF to create and display 
            questions in the quiz. Make sure to only include information you are okay to have potentially displayed for your peers. All information you upload
            will not be sent or sold to a third party!</p> 
        </div>
    </div>
  );
 } 

export default FAQ; 

