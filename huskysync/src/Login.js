import logo from './logo.svg';
import './Login.css';
import React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Home from './Home';
import NavBar from './components/Navbar';
import {Route, Routes} from "react-router-dom";
import GroupMain from "./GroupMain.js";
import { BrowserRouter } from 'react-router-dom';
import paw from './imgs/pawImg.png';
import GglLogin from './components/googleBtn';
import {gapi} from 'gapi-script';

const clientId = "98519260658-us1jcl7tveu7c273l7acrejm1vpb5fcq.apps.googleusercontent.com";

function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId, 
        scope: ""
      })
    }
    gapi.load('client:auth2', start);
  })

  const handleLogin = () => {
    navigate("./Home");
  };
  
  const handleEmailChange = (event) => {
    setInputEmail(event.target.value);
  };

  const handlePassChange = (event) => {
    setInputPassword(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
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
        <div className="App-header">
          <p>
            Logo
          </p>
          <p id="hello" style={{ textAlign: 'left'}}>
            Hey Huskies!
          </p>
          <p id="create">
            Create an account or sign in if you already have one
          </p>
          <p id="email">
            Email
          </p>
          <input
            type="text"
            id="email"
            value={inputEmail}
            onChange={handleEmailChange}
            style={{ width: '300px', display: 'block', marginLeft: '0', padding: '0', marginTop: '0' }}

          />
          <p id="password">
            Password
          </p>
          <input
            type="text"
            id="password"
            value={inputPassword}
            onChange={handlePassChange}
            style={{ width: '300px', display: 'block', marginLeft: '0', padding: '0', marginTop: '0' }}
          />
          <br></br>
          <div id="remPass">
            <label style={{ color: 'black' }} id ="remid">
              <input 
                type="checkbox"
                checked = {isChecked}
                onChange={handleCheckboxChange}
              />
              Remember me
            </label>
            <label htmlFor="forgotpass" style={{ marginLeft: '10px', marginTop: '0px' }}>
              <a
                id="forgotpass"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Forgot Password?
              </a>
            </label>
          </div>
          <br></br>
          <button onClick={handleLogin} id="loginbtn">Login</button>
          <br></br>
          <GglLogin />
        </div>
        </div>
      </div>
  );
}

export default Login;
