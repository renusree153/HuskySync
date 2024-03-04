import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import NavBar from './components/Navbar';
import Team from './components/Team';
import {Route, Routes, Navigate} from "react-router-dom";
import Home from './Home.js';
import GroupMain from "./GroupMain.js";
import Settings from './Settings';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path="/login" element={<Login/>}/>
        {isLoggedIn ? (
          <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Home" element={<Home/>} />
            <Route path="/GroupMain" element={<GroupMain/>}/>
            <Route path="/Settings" element={<Settings/>}/>
          </Routes>
          </div>
        ): (
          <Navigate to="/login"/>
        )
      
      }
      </div>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
