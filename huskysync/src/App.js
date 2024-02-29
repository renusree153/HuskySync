import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import NavBar from './components/Navbar';
import Team from './components/Team';
import {Route, Routes} from "react-router-dom";
import Home from './Home.js';
import GroupMain from "./GroupMain.js";
import Settings from './Settings';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/GroupMain" element={<GroupMain/>}/>
          <Route path="/Settings" element={<Settings/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
