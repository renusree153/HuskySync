import logo from './logo.svg';
import './Home.css';
import React from 'react';
import { useState } from 'react';
import NavBar from './components/Navbar';
import {Route, Routes} from "react-router-dom";
import GroupMain from "./GroupMain.js";
import { BrowserRouter } from 'react-router-dom';

function Home() {
  const [username, setUsername] = useState('');
  return (
      <div className="Home">
        <header className="Home-header">
          <h1>
            Welcome, Anumita {username}!
          </h1>
          <h2 className='subheader'>
            Start your customized learning experience here.
          </h2>
          <br></br>
          <button>Get Started</button>
          <br></br>
          <h2 className='demo-title'>
            How to use:
          </h2>

        </header>
      </div>
  );
}

export default Home;
