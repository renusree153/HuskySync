import React, { useEffect, useState } from 'react';
import OpenAI from 'openai';
import Quiz from '../Quiz'; 
import {DynamoDB} from 'aws-sdk';
import awsconfig from '../aws-exports'; 
import folderIcon from '../folder.svg';
import { QuizNameContext } from '../QuizNameContext';
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';
import S3Context from '../components/S3Context';
import { useS3Objs } from '../components/S3Objs';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/Navbar';
import '../UploadDocsPage.css'; 
import { useQuiz } from '../components/QuizContext';
import {listQuizzes} from '../graphql/queries';
import { updateQuiz } from '../graphql/mutations';
import { listExtractedTexts } from '../graphql/queries';

const client = new OpenAI({
    apiKey: '5aa36992a87ce596f53ea2d821839131cdf95814652fd55a0d5b93858ffa1df9',
    dangerouslyAllowBrowser: true,
    baseURL: 'https://api.together.xyz/v1',
});

const userText = {
    text: 'In chemistry basics, matter and its properties are fundamental concepts. Matter encompasses anything that occupies space and has mass, with properties like color, odor, taste, and texture used to describe it. Atoms, the basic units of matter, consist of protons, neutrons, and electrons, while elements are substances composed of only one type of atom. Chemical bonding involves ionic bonds formed by electron transfer, covalent bonds formed by electron sharing, and metallic bonds where electrons are shared by a lattice of atoms. Chemical reactions involve reactants transforming into products, with various types including synthesis, decomposition, and combustion. Acids donate protons, bases accept them, and the pH scale measures solution acidity or alkalinity. Chemical equations balance reactants and products, while stoichiometry studies their quantitative relationships. States of matter include solids with definite shape and volume, liquids with definite volume but no fixed shape, and gases with neither. Thermodynamics deals with heat transfer, including endothermic and exothermic reactions. Solutions are homogeneous mixtures with solvents and solutes, with solubility indicating the maximum solute that can dissolve. Organic chemistry focuses on carbon compounds and functional groups, while the periodic table categorizes elements into groups and periods. Chemical kinetics studies reaction rates and influencing factors like concentration and temperature, while electrochemistry involves redox reactions and electrolysis.',
    numQuestions: '5', 
    typeOfQuestions: 'Multiple Choice'
};

const QuizComponent = () => {
    const [quiz, setQuiz] = useState(null);
    const { s3Objs, setS3Objs } = useS3Objs();
    const [success, setSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const {quizName, setQuizName} = useContext(QuizNameContext);
    const { username, setUsername } = useContext(UserContext);
    const { s3ObjectID, setS3ObjectID } = useContext(S3Context);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const quizNamee = searchParams.get('quizName');
    let fullText = "";

    useEffect (() => {
      console.log("IN QUIZQUESTIONS PAGE");
    }, []);

    useEffect(() => {
      if (s3Objs !== null) {
        console.log("s3 objs ", s3Objs);
      }
    }, [s3Objs]);

    const [userText, setUserText] = useState({
        text: null,
        numQuestions: '5',
        typeOfQuestions: 'Multiple Choice'
      });

    useEffect(() => {
        async function fetchExtractedText() {
            try {
                const response = await fetch(awsconfig.aws_appsync_graphqlEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'X-Api-Key': awsconfig.aws_appsync_apiKey
                    },
                    body: JSON.stringify({ query: listExtractedTexts})
                });
                const data = await response.json();
                const dataArray = data.data.listExtractedTexts.items;
                dataArray.forEach(item => {
                    s3Objs.forEach(s3Key => {
                        if (s3Key === item.s3_key) {
                            fullText += item.extractedText;
                        }
                    });
                });
                
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
            console.log("FULL TEXT IS ", fullText);
            setUserText({
                text: fullText,
                numQuestions: '5',
                typeOfQuestions: 'Multiple Choice'
            });
        }
        fetchExtractedText();
    }, []); 

    useEffect(() => {
        fetchUserText(s3Objs);
    }, [s3Objs]);

    useEffect(() => {
        async function fetchQuiz() {
            try {
                console.log("user text is ", userText);
                const response = await client.chat.completions.create({
                    messages: [
                        {
                            role: 'user',
                            content: JSON.stringify(userText)
                        },
                    ],
                    model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
                });

                const quizName = 'Chemistry Quiz'; 
                const questions2 = response.choices.map(choice => ({ text: choice.message.content }));

                const questions = questions2[0]['text'].split(/\n\d+\./).slice(1);
                
                setQuiz(<Quiz quizName={quizName} questions={questions} />);
            } catch (error) {
                console.error('Error:', error);
                setQuiz(null);
            }
        }
        fetchQuiz();
    }, [userText]);

    const fetchUserText = async (s3Id) => {
        try {
            const params = {
                TableName: 'extractedText',
                Key: {
                    s3Id: s3Id
                }
            };
        } catch (error) {
            console.error('Error fetching user text:', error);
        }
    };

    return (
        <div>
            {quiz}
        </div>
    );
};

export default QuizComponent;