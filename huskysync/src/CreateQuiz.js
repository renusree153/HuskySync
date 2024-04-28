// React component for creating quizzes
import React, { useState, useEffect } from 'react';
import './CreateQuiz.css'; // Make sure the CSS path is correct
import awsconfig from './aws-exports';
import { listClasses } from './graphql/queries';
import { createQuiz } from './graphql/mutations';
import S3Uploader from "./S3upload"; // Make sure to replace with your actual import path

const CreateQuiz = ({ onClose }) => {
    const [quizName, setQuizName] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [tags, setTags] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [listOfClasses, setClasses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Api-Key': awsconfig.aws_appsync_apiKey
                },
                body: JSON.stringify({ query: listClasses })
            });
            const data = await response.json();
            setClasses(data.data.listClasses.items);
        }
        fetchData();
    }, []);

    const handleSave = async (event) => {
        event.preventDefault();
        const inputParams = {
            id: "7",
            curnumbers: 0,
            quizname: quizName,
            description: "A new quiz",
            class: selectedClass,
            date: date,
            tags: tags,
            time: time
        };

        const response = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-Api-Key': awsconfig.aws_appsync_apiKey
            },
            body: JSON.stringify({
                query: createQuiz,
                variables: { input: inputParams }
            })
        });

        const responseData = await response.json();

        if (responseData.errors) {
            console.error("Mutation failed:", responseData.errors);
        } else {
            console.log("Mutation successful:", responseData.data.createQuiz);
        }

        onClose();
    };

    return (
        <div className="create-quiz-modal">
            <div className="create-quiz-container">
                <button className="close-btn" onClick={onClose} aria-label="Close">
                    &times;
                </button>
                <form onSubmit={handleSave}>
                    <label htmlFor="class-select">Class</label>
                    <select id="class-select" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} required>
                        <option value="">Select a Class</option>
                        {listOfClasses.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    
                    <label htmlFor="quiz-name">Quiz Name</label>
                    <input id="quiz-name" type="text" value={quizName} onChange={(e) => setQuizName(e.target.value)} required />
                    
                     <label htmlFor="tags">Tags (min. 3 tags separated by commas)</label>
                    <input id="tags" type="text" value={tags} onChange={(e) => setTags(e.target.value)} required />
                    
                    <label htmlFor="date">Date</label>
                    <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    
                    <label htmlFor="time">Time</label>
                    <input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                    
                    <S3Uploader />
                    <button type="submit" className="save-btn">Save</button>
                </form>
            </div>
        </div>
    );
};

export default CreateQuiz;
