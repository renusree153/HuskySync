import './CustomizeQuiz.css';
import React from 'react';
import { useState } from 'react';
import NavBar from './components/Navbar';
import { Link } from 'react-router-dom';
import { useQuiz } from './components/QuizContext';
import awsconfig from './aws-exports';
import { createQuiz } from './graphql/mutations';

function CustomizeQuiz() {
    const [numQuestions, setNumQuestions] = useState('5'); 
    const [curnumbers, setCurNumbers] = useState(0);
    let quizDetails = {};
    const { quizName, setQuizName, selectedClass, setSelectedClass, tags, setTags, date, setDate, time, setTime, setUploaderKey, showCustomizeQuiz, setShowCustomizeQuiz } = useQuiz();

    const handleNumQuestionsChange = (event) => {
        setNumQuestions(event.target.value);
    };

    const [quizLength, setQuizLength] = useState('10'); 

    const handleQuizLengthChange = (event) => {
        setQuizLength(event.target.value);
    };

    const handleSave = () => {
        quizDetails = {
            quizname: quizName,
            class: selectedClass,
            curnumbers: curnumbers,
            tags: tags.split(','),    
            date: date, 
            time: time, 
            numQuestions: parseInt(numQuestions, 10), 
            quizLength: parseInt(quizLength, 10), 
            questionTypes: []
        };
        if (document.getElementById('trueOrFalse').checked) {
            quizDetails.questionTypes.push('TrueOrFalse');
        }
        if (document.getElementById('multipleChoice').checked) {
            quizDetails.questionTypes.push('MultipleChoice');
        }
        pushData();
    }

    const graphqlData = JSON.stringify({
        query: `
            mutation CreateQuiz($input: CreateQuizInput!) {
              createQuiz(input: $input) {
                id
                quizname
                curnumbers
                class
                tags
                date
                time
                numQuestions
                quizLength
                questionTypes
                createdAt
                updatedAt
                __typename
              }
            }
        `,
        variables: {
            input: quizDetails
        }
    });

    const pushData = async (event) => {
        try {
            console.log("quiz details are ", quizDetails);
            const response = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Api-Key': awsconfig.aws_appsync_apiKey
                },
                body: JSON.stringify({
                    query: createQuiz,
                    variables: { input: quizDetails }
                })
            });
            const responseData = await response.json();
    
            if (responseData.errors) {
                console.error("Mutation failed:", responseData.errors);
            } else if (responseData.data.createQuiz) {
                console.log("Mutation successful:", responseData.data.createQuiz);
                setShowCustomizeQuiz(true);
            }
        } catch (error) {
            console.error("Error saving quiz:", error);
        }
    }
    
    return (
        <div>
            <br></br>
            <div className='header'>
                <h2 id="titlet"> Customization:</h2>
            </div>
            <div className="settings-container create-quiz-container">
                <div className="settings">
                    <div className="setting-item">
                        <label>How Many Questions?</label>
                        <select value={numQuestions} onChange={handleNumQuestionsChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>

                    <div className="setting-item">
                        <label>How Many Minutes?</label>
                        <select value={quizLength} onChange={handleQuizLengthChange}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                        </select>
                    </div>

                    <div className="setting-item">
                        <label>What Types of Questions?</label>
                        <div > 
                        <div>
                            <input
                                type="checkbox"
                                id="trueOrFalse"
                                value="TrueOrFalse"                            />
                            <label htmlFor="trueOrFalse">True or False</label>
                        </div>
                        <div className="align">
                            <input
                                type="checkbox"
                                id="multipleChoice"
                                value="MultipleChoice"
                            />
                            <label htmlFor="multipleChoice">Multiple Choice</label>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" className="save-btn" onClick={handleSave}>Create</button>
        </div>
    );
}

export default CustomizeQuiz;