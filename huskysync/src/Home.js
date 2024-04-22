import logo from './logo.svg';
import './Home.css';
import React from 'react';
import { useState } from 'react';
import NavBar from './components/Navbar';
import {Route, Routes} from "react-router-dom";
import GroupMain from "./GroupMain.js";
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Home() {
  const [username, setUsername] = useState('');
  return (
      <div className="Home">
        <NavBar/>
        <header className="Home-header">
          <h1>
            Welcome, user{username}!
          </h1>
          <h3 className='subheader'>
            Start your customized learning experience here.
          </h3>
          <br></br>
          <Link to="/GroupMain">
            <button>Get Started</button>
          </Link>
          <br></br>
          <h3 className='demo-title'>
            How to use:
          </h3>
          <p>Insert demo video</p>
          <br></br>
          <Link to="/FAQ">
            <button>FAQ</button>
          </Link>
          <br></br>

        </header>
      </div>
  );
}

export default Home;