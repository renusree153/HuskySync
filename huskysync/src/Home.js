import logo from './logo.svg';
import './Home.css';
import React from 'react';
import { useState } from 'react';
import NavBar from './components/Navbar';
import {Route, Routes} from "react-router-dom";
import GroupMain from "./GroupMain.js";
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import huskysync from './imgs/huskysync.png';
import { getCurrentUser } from '@aws-amplify/auth';

function Home() {
  const [username, setUsername] = useState('');
  const handleSignUp = async () => {
    try {
      const curUser = await getCurrentUser();
      setUsername(curUser.username);
    } catch (error) {
      console.error("error getting username");
    }
  }

  handleSignUp();

  return (
    <div className="Home">
      <NavBar />
      <div className="body">
        <div className="logo-container">
          <img src={huskysync} id="logo" alt="Huskysync Logo"/>
        </div>
        <div className="content">
          <h1>Welcome, {username}!</h1>
          <h3 className='subheader'>
            Start your customized learning experience here.
          </h3>
          <div className="button-container">
            <Link to="/GroupMain">
              <button>Get Started</button>
            </Link>
            <Link to="/FAQ">
              <button>Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;