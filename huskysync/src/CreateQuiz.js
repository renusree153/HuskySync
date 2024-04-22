import React, { useState, useEffect } from 'react';
import './CreateQuiz.css';
import awsconfig from './aws-exports';
import { listClasses } from './graphql/queries';
import './CreateQuiz.css';
import S3Uploader from "./S3upload";
import { createQuiz } from './graphql/mutations';

const CreateQuiz = ({ onClose }) => {
    const [quizName, setQuizName] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [tags, setTags] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
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
        }
        pullData()
    }, []);

    console.log(selectedClass.name);

    const handleSave = async () => {
        const inputParams = 
            {id: "7", curnumbers: 0, quizname: quizName, description: "HELLO", class: selectedClass, date: date, tags: tags, time: time};
        
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
                    variables: {
                        input: inputParams
                    }
                })
            });
    
            const responseData = await response.json();
    
            // Check for errors in the response
            if (responseData.errors) {
                console.error("Mutation failed:", responseData.errors);
            } else {
                console.log("Mutation successful:", responseData.data);
            }
    
            onClose(); // Close the modal or perform any other action
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="create-quiz">
            <h2>Create Quiz</h2>
            <button className="close-btn" onClick={onClose}>
                <i class="bi bi-x-circle"></i>
            </button>
            <label>
                Class:
                <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                    <option value="">Select a Class</option>
                    {listOfClasses.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Quiz Name:
                <input type="text" value={quizName} onChange={(e) => setQuizName(e.target.value)} />
            </label>
            <label>
                Tags (min. 3 tags seperated by commas):
                <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
            </label>
            <label>
                Date:
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
            <label>
                Time:
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </label>
            <S3Uploader />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default CreateQuiz;