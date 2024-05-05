import React, { useState } from 'react';
import awsconfig from './aws-exports'; // Ensure AWS config path is correct
import folderIcon from './folder.svg'; // Ensure folder icon path is correct
import { QuizNameContext } from './QuizNameContext';
import { useContext } from 'react';
import { UserContext } from './components/UserContext';
const AWS = require('aws-sdk');

const S3Uploader = () => {
    const [success, setSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const {quizName, setQuizName} = useContext(QuizNameContext);
    const { username, setUsername } = useContext(UserContext);

    console.log("hello quiz name ", {quizName});

    // AWS SDK configuration
    AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1'
    });

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSuccess(false); // Reset the success state upon selecting a new file
        uploadFile(file); // Automatically upload the file once selected
    };

    const uploadFile = async (file) => {
        if (!file) {
            alert('Please select a file');
            return;
        }

        const s3 = new AWS.S3();
        const params = {
            Bucket: 'huskysyncbucketc500b-dev',
            Key: file.name,
            Body: file,
            Metadata: {
                username: username,
                quizname: quizName,
                documentname: file.name
            }
        };

        try {
            await s3.upload(params).promise();
            console.log('File uploaded successfully');
            setSuccess(true);
        } catch (error) {
            console.error('Error uploading file, please try again:', error);
            setSuccess(false);
        }
    };

    return (
        <div className="drop-zone">
            <label htmlFor="file-input" className="file-input-label">
                <img src={folderIcon} alt="Folder icon" className="folder-icon" />
                <span>{selectedFile ? selectedFile.name : 'Choose a file...'}</span>
            </label>
            <input id="file-input" type="file" onChange={handleFileSelect} style={{ display: 'none' }} />
            {success && (
                <div className="checkmark-container">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="checkmark-icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        stroke="#6C63FF"
                    >
                        <path d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default S3Uploader;
