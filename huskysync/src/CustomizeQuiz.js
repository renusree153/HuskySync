import './CustomizeQuiz.css';
import React, { useEffect, useState, useContext } from 'react';
import { useQuiz } from './components/QuizContext';
import awsconfig from './aws-exports';
import { createQuiz, updateUsers } from './graphql/mutations';
import { listUsers } from './graphql/queries';
import { UserContext } from './components/UserContext';
import S3Context from './components/S3Context';
import QuizCreated from './QuizCreated';

function CustomizeQuiz() {
    const [numQuestions, setNumQuestions] = useState('5');
    const [curnumbers, setCurNumbers] = useState(0);
    let quizDetails = {};
    const { quizName, selectedClass, tags, date, time, showQuizCreated, setShowQuizCreated } = useQuiz();
    const { username } = useContext(UserContext);
    const [userID, setUserId] = useState(null);
    const [userProps, setUserProps] = useState(null);
    const { s3ObjectID } = useContext(S3Context);
    const [btnClicked, setBtnClicked] = useState(false);

    const handleNumQuestionsChange = (event) => {
        setNumQuestions(event.target.value);
    };

    const [quizLength, setQuizLength] = useState('10');

    const handleQuizLengthChange = (event) => {
        setQuizLength(event.target.value);
    };

    const handleSave = async () => {
        console.log("btn clicked at ", btnClicked);
        if (btnClicked) {
            return;
        }
        quizDetails = {
            quizname: quizName,
            class: selectedClass,
            curnumbers: curnumbers,
            tags: tags.split(','),
            date: date,
            time: time,
            numQuestions: parseInt(numQuestions, 10),
            quizLength: parseInt(quizLength, 10),
            questionTypes: [],
            s3objs: s3ObjectID
        };
        if (document.getElementById('trueOrFalse').checked) {
            quizDetails.questionTypes.push('TrueOrFalse');
        }
        if (document.getElementById('multipleChoice').checked) {
            quizDetails.questionTypes.push('MultipleChoice');
        }
        setBtnClicked(true);
        pushData();
        setShowQuizCreated(true);
    }

    const graphqlData = JSON.stringify({
        query: `
            mutation CreateQuiz($input: CreateQuizInput!) {
              createQuiz(input: $input) {
                id
                quizname
                curnumbers
                class
                tags
                date
                time
                rsvpquizzes
                numQuestions
                quizLength
                questionTypes
                createdAt
                updatedAt
                __typename
              }
            }
        `,
        variables: {
            input: quizDetails
        }
    });

    const pushData = async () => {
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
                    variables: { input: quizDetails }
                })
            });
            const responseData = await response.json();

            if (responseData.errors) {
                console.error("Mutation failed:", responseData.errors);
            } else if (responseData.data.createQuiz) {
                await updateUserRSVPQuizzes();
                console.log("Mutation successful:", responseData.data.createQuiz);
            }
        } catch (error) {
            console.error("Error saving quiz:", error);
        }
    };

    const updateUserRSVPQuizzes = async () => {
        try {
            const getUserId = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Api-Key': awsconfig.aws_appsync_apiKey
                },
                body: JSON.stringify({
                    query: listUsers
                })
            });
            const response = await getUserId.json();
            const fetchData = response.data.listUsers;
            for (let i = 0; i < fetchData.items.length; i++) {
                if (fetchData.items[i].username === username) {
                    setUserProps(fetchData.items[i]);
                    setUserId(fetchData.items[i].id);
                    break;
                }
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };

    useEffect(() => {
        const fetchDataAndUpdate = async () => {
            if (userID && userProps) {
                const existingQuizzes = userProps.rsvpquizzes || [];
                const updatedQuizzes = [...existingQuizzes, quizName];

                const variables = {
                    input: {
                        id: userID,
                        rsvpquizzes: updatedQuizzes
                    }
                };

                try {
                    const updateResponse = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                            'X-Api-Key': awsconfig.aws_appsync_apiKey
                        },
                        body: JSON.stringify({
                            query: updateUsers,
                            variables: variables
                        })
                    });

                    if (!updateResponse.ok) {
                        throw new Error('Failed to update user quizzes');
                    }

                    console.log('User quizzes updated successfully');
                } catch (error) {
                    console.error('Error updating user quizzes:', error);
                }
            }
        };

        fetchDataAndUpdate();
    }, [userID, userProps, quizName]);

    return (
        <div>
            {showQuizCreated ? (
                <div className="create-quiz-panel">
                    <QuizCreated />
                </div>
            ) : (
                <div>
                    <br />
                    <div className='header'>
                        <h2 id="titlet"> Customization:</h2>
                    </div>
                    <div className="settings-container create-quiz-container">
                        <div className="settings">
                            <div className="setting-item">
                                <label>How Many Questions?</label>
                                <select value={numQuestions} onChange={handleNumQuestionsChange}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                </select>
                            </div>

                            <div className="setting-item">
                                <label>How Many Minutes?</label>
                                <select value={quizLength} onChange={handleQuizLengthChange}>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                </select>
                            </div>

                            <div className="setting-item">
                                <label>What Types of Questions?</label>
                                <div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="trueOrFalse"
                                            value="TrueOrFalse"
                                        />
                                        <label htmlFor="trueOrFalse">True or False</label>
                                    </div>
                                    <div className="align">
                                        <input
                                            type="checkbox"
                                            id="multipleChoice"
                                            value="MultipleChoice"
                                        />
                                        <label htmlFor="multipleChoice">Multiple Choice</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="save-btn" onClick={handleSave}>Create</button>
                </div>
            )}
        </div>
    );
}

export default CustomizeQuiz;
