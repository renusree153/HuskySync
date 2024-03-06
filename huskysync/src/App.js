import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import NavBar from './components/Navbar';
import Team from './components/Team';
import {Route, Routes, Navigate} from "react-router-dom";
import Home from './Home.js';
import GroupMain from "./GroupMain.js";
import Settings from './Settings.js';
import Login from "./Login.js";
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          {isLoggedIn ? (
            <>
                <Route path="/" element={<Home />} />
                <Route path="/GroupMain" element={<GroupMain />} />
                <Route path="/Settings" element={<Settings />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
