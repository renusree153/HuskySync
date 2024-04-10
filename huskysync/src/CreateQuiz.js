import React, { useState } from 'react';
import './CreateQuiz.css';

const CreateQuiz = ({ onClose }) => {
    const [quizName, setQuizName] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [tags, setTags] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSave = () => {
        // Add logic to save the quiz data
        console.log('Quiz saved!');
        // Close the modal after saving
        onClose();
    };

    return (
        <div className="create-quiz">
            <h2>Create Quiz</h2>
            <label>
                Class:
                <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                    <option value="">Select a Class</option>
                    {/* Add options for classes */}
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