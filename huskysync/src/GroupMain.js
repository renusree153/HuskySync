import React from "react";
import { useState, useEffect } from 'react';
import './GroupMain.css';
import NavBar from './components/Navbar';
import {Multiselect} from 'multiselect-react-dropdown';
import Team from "./components/Team";
import Rsvp from "./components/RSVP";
import PastQuizzes from "./components/PastQuizzes.js"
import {BrowserRouter, Routes, Navigate} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Amplify} from "aws-amplify";
import { uploadData, getUrl, remove } from 'aws-amplify/storage';
import awsconfig from './aws-exports';
import { DataStore} from '@aws-amplify/datastore';
import { listClasses } from './graphql/queries';
import { createClass } from './graphql/mutations';
import QuizBlock from "./components/QuizBlock";
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import S3Uploader from "./S3upload";
import CreateQuiz from './CreateQuiz';
import './CreateQuiz.css';
import { listQuizzes } from "./graphql/queries";

Amplify.configure(awsconfig);
const AWS = require('aws-sdk');

function GroupMain() {

    const [activeTab, setActiveTab] = useState("join");

    const [showQuizModal, setShowQuizModal] = useState(false);
    const [showCreateQuizButton, setShowCreateQuizButton] = useState(true);

    const [data, setData] = useState([]);
    const [listOfClasses, setClasses] = useState([]);

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
              query: listClasses
            })
          })
          data = await data.json();
          setClasses(data.data.listClasses.items);
          console.log(data);
        }
        pullData()
    }, []);

    const toggleQuizModal = () => {
        setShowQuizModal(!showQuizModal);
        setShowCreateQuizButton(!showCreateQuizButton);
    };

    // handleRSVP, handleJoin, and handlePast change colors of the two buttons
    // RSVP'd and Join based on which one is clicked 

    const handleRSVP = () => {
        document.getElementById("creategroup").style.backgroundColor = "white";
        document.getElementById("creategroup").style.color = "black";
        document.getElementById("pastquizzes").style.backgroundColor = "white";
        document.getElementById("pastquizzes").style.color = "black";
        document.getElementById("joinlive").style.backgroundColor = "#4B2E83";
        document.getElementById("joinlive").style.color = "white";
        setActiveTab("rsvp");
    }

    const handleJoin = () => {
        document.getElementById("joinlive").style.backgroundColor = "white";
        document.getElementById("joinlive").style.color = "black";
        document.getElementById("pastquizzes").style.backgroundColor = "white";
        document.getElementById("pastquizzes").style.color = "black";
        document.getElementById("creategroup").style.backgroundColor = "#4B2E83";
        document.getElementById("creategroup").style.color = "white";
        setActiveTab("join");
    }

    const handlePast = () => {
        document.getElementById("joinlive").style.backgroundColor = "white";
        document.getElementById("joinlive").style.color = "black";
        document.getElementById("creategroup").style.backgroundColor = "white";
        document.getElementById("creategroup").style.color = "black";
        document.getElementById("pastquizzes").style.backgroundColor = "#4B2E83";
        document.getElementById("pastquizzes").style.color = "white";
        setActiveTab("pastquizzes")
    }

    return (
        <div className="splitContainer">
            <NavBar/>
            <div class="left-panel">
                {/* Directly embed CreateQuiz component */}
                <CreateQuiz />
    
            </div>
            <div class="line"></div>
            <div class="right-panel">
                <h2>Quizzes</h2>
                <div className="class-filter">
                    <h3>Filter by Class: </h3>
                    <select className="dropdown">
                        <option value="">Select a Class</option>
                        {listOfClasses.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button id="creategroup" onClick={handleJoin}>
                    Join
                </button>
                <button id="joinlive" onClick={handleRSVP}>
                    Upcoming
                </button>
                <button id="pastquizzes" onClick={handlePast}>
                    Past Quizzes
                </button>
                <hr id="hrgroups"></hr>
                {activeTab === "join" && <div className="scrollable-content"><Team /></div>}
                {activeTab === "rsvp" && <div className="scrollable-content"><Rsvp /></div>}
                {activeTab === "pastquizzes" && <div className="scrollable-content"><PastQuizzes /></div>}
            </div>
        </div>
    )}

export default GroupMain;