import React, { useState, useEffect } from 'react';
import './CreateQuiz.css';
import awsconfig from './aws-exports';
import { listClasses } from './graphql/queries';
import { createQuiz } from './graphql/mutations';
import { useContext } from 'react';
import S3Uploader from "./S3upload";
import CustomizeQuiz from './CustomizeQuiz';
import { QuizNameContext } from './QuizNameContext';
import { useQuiz } from './components/QuizContext';
import S3Context from './components/S3Context';
import {listQuizzes} from './graphql/queries';

const CreateQuiz = () => {
    const { quizName, setQuizName, selectedClass, setSelectedClass, tags, setTags, date, setDate, time, setTime, uploaderKey, setUploaderKey, showCustomizeQuiz, setShowCustomizeQuiz } = useQuiz();
    const [listOfClasses, setClasses] = useState([]);
    const {s3ObjectID, setS3ObjectID} = useContext(S3Context);
    const [listOfQuizzes, setQuizzes] = useState([]);
    const [quizId, setQuizId] = useState();
    const [quizProps, setQuizProps] = useState([]);

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

    useEffect(() => {
        async function fetchQuizId() {
            try {
                const response = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'X-Api-Key': awsconfig.aws_appsync_apiKey
                    },
                    body: JSON.stringify({ query: listQuizzes })
                });
                const data = await response.json();
                setQuizzes(data.data.listQuizzes);
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        }
        fetchQuizId();
        for (let i = 0; i < listOfQuizzes.length; i++) {
            if (listOfQuizzes.items[i].quizname === quizName) {
                setQuizId(listOfQuizzes.items[i].id);
                setQuizProps(listOfQuizzes.items[i]);
                break;
            }
        }
    }, [quizName]);

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
            time: time,
            s3objs: s3ObjectID
        };
        console.log("s3 obj id is ", s3ObjectID);
        setShowCustomizeQuiz(true);
    };
    
    return (
        <div>
            {showCustomizeQuiz ? (
                <div className="create-quiz-panel">
                    <CustomizeQuiz/>
                </div>
            ) : (
                <div className="create-quiz-panel">
                    <div className="create-quiz-container">
                        <form onSubmit={handleSave}>
                            <label htmlFor="create-quiz-name" className="label-create-quiz">Create Quiz</label>
                            <label htmlFor="class-select">Class</label>
                            <select id="class-select" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} required>
                                <option value="">Select a Class</option>
                                {listOfClasses.map((item) => (
                                    <option key={item.id} value={item.name}>{item.name}</option>
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
                            <S3Uploader key={uploaderKey} /> 
                            
                            <button type="submit" className="save-btn">Next</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateQuiz;