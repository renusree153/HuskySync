import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import NavBar from './components/Navbar';
import Team from './components/Team';
import {Route, Routes, Navigate} from "react-router-dom";
import Login from "./Login.js";
import Home from './Home.js';
import GroupMain from "./GroupMain.js";
import Settings from './Settings';
import FAQ from './FAQ';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleLogin = () => {
    setIsAuthenticated(true);
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/Login"/>: <Login handleLogin={handleLogin}/>}/>
          <Route path="/" element={<Home/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/GroupMain" element={<GroupMain/>}/>
          <Route path="/Settings" element={<Settings/>}/>
          <Route path="/FAQ" element={<FAQ/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;