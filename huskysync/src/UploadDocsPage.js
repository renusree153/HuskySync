import React, { useState } from 'react';
import S3Uploader from './S3upload';
import NavBar from './components/Navbar';
import awsconfig from './aws-exports';
import './UploadDocsPage.css'; 
import folderIcon from './folder.svg'; 
import { useEffect } from 'react';
import { useQuiz } from './components/QuizContext';
import {listQuizzes} from './graphql/queries';
import { useLocation } from 'react-router-dom';

const UploaderPage = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const quizNamee = searchParams.get('quizName');
    const [quizId, setQuizId] = useState();
    const [quizProps, setQuizProps] = useState([]);
    const [listOfQuizzes, setQuizzes] = useState([]);
    const [s3Objs, setS3Objs] = useState([]);
    const {selectedClass, setSelectedClass, tags, setTags, date, setDate, time, setTime, setUploaderKey, showCustomizeQuiz, setShowCustomizeQuiz } = useQuiz();

    const handleUpload = (file) => {
        setUploadedFiles([...uploadedFiles, file]);
    };

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
            console.log("cur quiz is ", curQuiz);
            if (curQuiz && listOfQuizzes[i].quizname === quizNamee) {
                setQuizId(listOfQuizzes[i].id);
                setQuizProps(listOfQuizzes[i]);
                break;
            }
        }
    }, [listOfQuizzes]);    

    useEffect (() => {
        getS3Objs();
    }, [quizProps]);
    
    const getS3Objs = () => {
        if (quizProps) {
            setS3Objs(quizProps["s3objs"]);
        }
    }

    return (
        <div>
            <NavBar/>
            <header className="Upload-header">
                <h1>Upload Documents</h1>
                <div className="drag-drop-area">
                    <div className="drop-zone">
                        <img src={folderIcon} alt="SVG Image"></img>
                        <p>Drag & Drop files here</p>
                        <S3Uploader onUpload={handleUpload} />
                    </div>
                    <div className="uploaded-files">
                        <h2>Uploaded Files</h2>
                        <ul>
                        {s3Objs && s3Objs.map((s3Obj, index) => (
                            <li key={index}>
                                <p> {s3Obj}</p>
                            </li>
                        ))}
                    </ul>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default UploaderPage;
