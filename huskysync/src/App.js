import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import NavBar from './components/Navbar';

function App() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  return (
    <div className="App">
      <NavBar></NavBar>
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

export default App;
