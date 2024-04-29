import React, { useState, useEffect } from 'react';
import './CreateQuiz.css';
import awsconfig from './aws-exports';
import { listClasses } from './graphql/queries';
import { createQuiz } from './graphql/mutations';
import S3Uploader from "./S3upload"; // Corrected the file name here to match your file system


const CreateQuiz = () => {
    const [quizName, setQuizName] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [tags, setTags] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [listOfClasses, setClasses] = useState([]);
    const [uploaderKey, setUploaderKey] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
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
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        }
        fetchData();
    }, []);

    const resetForm = () => {
        setQuizName('');
        setSelectedClass('');
        setTags('');
        setDate('');
        setTime('');
        setUploaderKey(prevKey => prevKey + 1);
    };

    const handleSave = async (event) => {
        event.preventDefault();
        const inputParams = {
            curnumbers: 0,
            quizname: quizName,
            description: "A new quiz",
            class: selectedClass,
            date: date,
            tags: tags.split(",").map(tag => tag.trim()),
            time: time
        };

        try {
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
            } else if (responseData.data.createQuiz) {
                console.log("Mutation successful:", responseData.data.createQuiz);
                resetForm();
            }
        } catch (error) {
            console.error("Error saving quiz:", error);
        }
    };

    return (
        <div className="create-quiz-panel">
            <div className="create-quiz-container">
                <form onSubmit={handleSave}>
                    <label htmlFor="create-quiz-name" className="label-create-quiz">Create Quiz</label>
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
                    
                    <label htmlFor="upload">Upload Study Files</label>
                    <S3Uploader key={uploaderKey} />  {/* Simply include the S3Uploader component without any props */}
                    
                    <a href="/CustomizeQuiz">
                    <button type="submit" className="save-btn">Next</button>
                    </a>
                </form>
            </div>
        </div>
    );
};

export default CreateQuiz;
