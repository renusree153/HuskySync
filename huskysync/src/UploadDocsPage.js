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
import { useS3Objs } from './components/S3Objs';
import { updateQuiz } from './graphql/mutations';
import { Link } from 'react-router-dom';

const UploaderPage = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const quizNamee = searchParams.get('quizName');
    const [quizId, setQuizId] = useState();
    const [quizProps, setQuizProps] = useState([]);
    const [listOfQuizzes, setQuizzes] = useState([]);
    const { s3Objs, setS3Objs } = useS3Objs();
    const {selectedClass, setSelectedClass, tags, setTags, date, setDate, time, setTime, setUploaderKey, showCustomizeQuiz, setShowCustomizeQuiz } = useQuiz();

    const handleUpload = (file) => {
        console.log("IN HANDLE UPLOAD");
        setS3Objs([...s3Objs, file]);
        updateS3ObjsForQuiz(quizId, [...s3Objs, file]);
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
            console.log("cur quiz is ", curQuiz.quizname);
            if (curQuiz && listOfQuizzes[i].quizname === quizNamee) {
                setQuizId(listOfQuizzes[i].id);
                console.log("PROPS ", listOfQuizzes[i]);
                setQuizProps(listOfQuizzes[i]);
                break;
            }
        }
    }, [listOfQuizzes, quizNamee]);    

    useEffect (() => {
        getS3Objs();
    }, [quizProps, s3Objs, quizId]);
    
    const getS3Objs = () => {
        if (quizProps) {
            setS3Objs(quizProps["s3objs"]);
            console.log("quiz props s3 obj ", quizProps);
            updateS3ObjsForQuiz(quizId, s3Objs);
        }
    }

    const updateS3ObjsForQuiz = async (quizId, newS3Objs) => {
        console.log("quiz id from update func ", quizId);
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
            console.log("S3Objs updated successfully upload docs page :", data);
        } catch (error) {
            console.error("Error updating S3Objs:", error);
        }
    };

    return (
        <div>
            <NavBar/>
            <header className="Upload-header">
                <h1>Upload Documents</h1>
                <div className="drag-drop-area">
                    <div className="drop-zone">
                        <img src={folderIcon} alt="SVG Image"></img>
                        <p>Drag & Drop files here</p>
                        <S3Uploader>
                            onUpload = {handleUpload}
                        </S3Uploader>
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
                <div>
                    <a href="/GroupMain" className="save-btn">Done</a>
                 </div>
            </header>
            <div className="start-quiz-button">
            <Link to={`/QuizQuestions`}>
                <button id = "startbtn"> Start </button>
            </Link>
            </div>
        </div>
    );
};

export default UploaderPage;


