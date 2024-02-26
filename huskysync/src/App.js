import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import NavBar from './components/Navbar';
import {Route, Routes} from "react-router-dom";
import Home from './Home.js';
import GroupMain from "./GroupMain.js";
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
