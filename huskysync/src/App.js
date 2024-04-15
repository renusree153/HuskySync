import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import NavBar from './components/Navbar';
import Team from './components/Team';
import {Route, Routes, Navigate} from "react-router-dom";
import Login from "./Login.js";
import Home from './Home.js';
import GroupMain from "./GroupMain.js";
import Settings from './Settings';
import FAQ from './FAQ';
import { BrowserRouter } from 'react-router-dom';
import { Amplify } from "aws-amplify";
import awsconfig from './aws-exports';
import { DataStore} from '@aws-amplify/datastore';
import { listClasses } from './graphql/queries';
import { createClass } from './graphql/mutations';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import S3UploaderPage from './UploadDocsPage.js';

Amplify.configure(awsconfig);

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleLogin = () => {
    setIsAuthenticated(false);
  }

  /*

  // code to crete a class which can be moved to another file
  const handleCreateClass = async () => {
    try {
      const response = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Api-Key': awsconfig.aws_appsync_apiKey
        },
        body: JSON.stringify({
          query: `
            mutation CreateClass($input: CreateClassInput!) {
              createClass(input: $input) {
                id
                name
                createdAt
                updatedAt
                __typename
              }
            }
          `,
          variables: {
            input: {
              name: 'CHEM 142'
            }
          }
        })
      });
  
      const data = await response.json();
      console.log('Class created:', data.data.createClass);
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };  

  //handleCreateClass();
  */

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/"/>: <Login handleLogin={handleLogin}/>}/>
          <Route path="/" element={<Home/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/GroupMain" element={<GroupMain/>}/>
          <Route path="/Settings" element={<Settings/>}/>
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/Upload" element={<S3UploaderPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
