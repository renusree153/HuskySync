import React from "react";
import { useState, useEffect } from 'react';
import './GroupMain.css';
import NavBar from './components/Navbar';
import {Multiselect} from 'multiselect-react-dropdown';
import Team from "./components/Team";
import {Route, Routes, Navigate} from "react-router-dom";
import Login from "./Login.js";
import Home from './Home.js';
import Settings from './Settings';
import FAQ from './FAQ';
import { BrowserRouter } from 'react-router-dom';
import { Amplify } from "aws-amplify";
import awsconfig from './aws-exports';
import { DataStore} from '@aws-amplify/datastore';
import { listClasses } from './graphql/queries';
import { createClass } from './graphql/mutations';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

function GroupMain() {
    const [data, setData] = useState([]);
    const [listOfClasses, setClasses] = useState([]);

    // this approach isn't working bc API import isnt working.
    // using the fetch approach for now 
    /*
    useEffect(() => {
        const pullData = async () => {
        const data = await API.graphql({ query: listClasses})
        }
        pullData()
    }, [])
    */

    useEffect(() => {
        const pullData = async () => {
          let data = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'X-Api-Key': awsconfig.aws_appsync_apiKey
            },
            body: JSON.stringify({
              query: `query MyQuery {
                listClasses {
                  items {
                    id
                    name
                  }
                }
              }
              `
            })
          })
          data = await data.json();
          setClasses(data.data.listClasses.items);
        }
        pullData()
    }, [])
    return (
        <div className="splitContainer">
            <NavBar/>
            <div class="left-panel">
                <h2>Classes</h2>
                <select className="dropdown">
                    <option value="">Select a Class</option>
                    {listOfClasses.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
            <div class="line"></div>
            <div class="right-panel">
                <h2>Quizzes</h2>
                <button id="joinlive">RSVP'd</button>
                <button id="creategroup">Join</button>
                <hr id="hrgroups"></hr>
                <Team />
                <Team />
            </div>
        </div>
    )
}

export default GroupMain;