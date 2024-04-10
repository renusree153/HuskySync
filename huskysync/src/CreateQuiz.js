import React, { useState, useEffect } from 'react';
import './CreateQuiz.css';
import awsconfig from './aws-exports';
import { listClasses } from './graphql/queries';

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

    const handleSave = () => {
        console.log('Quiz saved!');
        onClose();
    };

    return (
        <div className="create-quiz">
            <h2>Create Quiz</h2>
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
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Exit</button>
        </div>
    );
};

export default CreateQuiz;