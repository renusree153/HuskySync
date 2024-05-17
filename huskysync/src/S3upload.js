import React, { useState, useEffect} from 'react';
import awsconfig from './aws-exports'; 
import folderIcon from './folder.svg';
import { QuizNameContext } from './QuizNameContext';
import { useContext } from 'react';
import { UserContext } from './components/UserContext';
import S3Context from './components/S3Context';
import { useS3Objs } from './components/S3Objs';
import { useLocation } from 'react-router-dom';
import NavBar from './components/Navbar';
import './UploadDocsPage.css'; 
import { useQuiz } from './components/QuizContext';
import {listQuizzes} from './graphql/queries';
import { updateQuiz } from './graphql/mutations';


const AWS = require('aws-sdk');

const S3Uploader = ({onUpload}) => {
    const { s3Objs, setS3Objs } = useS3Objs();
    const [success, setSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const {quizName, setQuizName} = useContext(QuizNameContext);
    const { username, setUsername } = useContext(UserContext);
    const { s3ObjectID, setS3ObjectID } = useContext(S3Context);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const quizNamee = searchParams.get('quizName');
    const [quizId, setQuizId] = useState();
    const [quizProps, setQuizProps] = useState([]);
    const [listOfQuizzes, setQuizzes] = useState([]);
    const {selectedClass, setSelectedClass, tags, setTags, date, setDate, time, setTime, setUploaderKey, showCustomizeQuiz, setShowCustomizeQuiz } = useQuiz();

    AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1'
    });

    useEffect(() => {
        console.log("Quiz name is ", quizNamee);
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
                setQuizzes(data.data.listQuizzes.items);
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        }
        fetchQuizId();
    }, []); 
    
    useEffect(() => {
        for (let i = 0; i < listOfQuizzes.length; i++) {
            const curQuiz = listOfQuizzes[i];
            if (curQuiz && listOfQuizzes[i].quizname === quizNamee) {
                setQuizId(listOfQuizzes[i].id);
                console.log("PROPS ", listOfQuizzes[i]);
                setQuizProps(listOfQuizzes[i]);
                break;
            }
        }
    }, [listOfQuizzes]);    

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        console.log("file name is ", file);
        setSelectedFile(file);
        setSuccess(false); 
        uploadFile(file); 
        if (!s3Objs) {
            setS3Objs([file.name]);
        }
        else {
            setS3Objs([...s3Objs, file.name]);
            updateS3ObjsForQuiz(quizId, [...s3Objs, file.name]);
        }
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
            const data = await s3.upload(params).promise();
            console.log('File uploaded successfully');
            setS3ObjectID(data.Key);
            setSuccess(true);
        } catch (error) {
            console.error('Error uploading file, please try again:', error);
            setSuccess(false);
        }
    };

    const updateS3ObjsForQuiz = async (quizId, newS3Objs) => {
        try {
            const response = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Api-Key': awsconfig.aws_appsync_apiKey
                },
                body: JSON.stringify({
                    query: `
                        mutation UpdateQuiz($input: UpdateQuizInput!) {
                            updateQuiz(input: $input) {
                                id
                                s3objs
                            }
                        }
                    `,
                    variables: {
                        input: {
                            id: quizId,
                            s3objs: newS3Objs
                        }
                    }
                })
            });
            const data = await response.json();
            console.log("S3Objs updated successfully:", data);
        } catch (error) {
            console.error("Error updating S3Objs:", error);
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
