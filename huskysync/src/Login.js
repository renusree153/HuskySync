import logo from './logo.svg';
import './Login.css';
import React from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Home from './Home';
import NavBar from './components/Navbar';
import {Route, Routes} from "react-router-dom";
import GroupMain from "./GroupMain.js";
import { BrowserRouter } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function Login() {
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
            onChange={handleEmailChange}
          />

          <label htmlFor='password'>Password</label>
          <input
            type="text"
            id="password"
            value={inputPassword}
            onChange={handlePassChange}
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
          <button onClick={handleLogin}>Login</button>
          <br></br>
          <button>Sign in with Google</button>
        </header>
      </div>
  );
}

export default Login;
