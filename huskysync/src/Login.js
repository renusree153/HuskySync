import logo from './logo.svg';
import './Home.css';
import React from 'react';
import { useState } from 'react';
import NavBar from './components/Navbar';
import {Route, Routes} from "react-router-dom";
import GroupMain from "./GroupMain.js";
import { BrowserRouter } from 'react-router-dom';

function Home() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  return (
      <div className="App">
        <header className="App-header">
          <p>
            Logo
          </p>
          <p>
            Hey Huskies!
            Create an account or sign in if you already have one!
          </p>
          <label htmlFor='email'>Email</label>
          <input
            type="text"
            id="email"
            value={inputEmail}
          />

          <label htmlFor='password'>Password</label>
          <input
            type="text"
            id="password"
            value={inputPassword}
          />
          <br></br>
          <a
            className="forgotpass"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Forgot Password?
          </a>
          <br></br>
          <button>Login</button>
          <br></br>
          <button>Sign in with Google</button>
        </header>
      </div>
  );
}

export default Home;
