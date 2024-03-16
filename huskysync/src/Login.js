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
import paw from './imgs/pawImg.png';

function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("./Home");
  };
  
  const handleEmailChange = (event) => {
    setInputEmail(event.target.value);
  };

  const handlePassChange = (event) => {
    setInputPassword(event.target.value);
  };
  
  return (
      <div id="App1">
        <div className="left-half">
          <div id="card">
            <div className="digContainer">
              <img src={paw} id="pawImg"/>
              <h1 className="motto" id="digital"> Digital </h1>
            </div>
            <h1 className="motto"> platform for </h1>
            <h1 className="motto"> efficient </h1>
            <h1 className="motto" id="learning"> learning. </h1>
          </div>
        </div>
        <div className="right-half">
        <header className="App-header">
          <p>
            Logo
          </p>
          <p id="hello" style={{ textAlign: 'left'}}>
            Hey Huskies!
          </p>
          <p>
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
      </div>
  );
}

export default Login;
