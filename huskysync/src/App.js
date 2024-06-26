import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Amplify } from "aws-amplify";
import awsconfig from './aws-exports';
import { Authenticator, View, Image, Text, useTheme } from '@aws-amplify/ui-react';
import NavBar from './components/Navbar';  
import Home from './Home.js';
import GroupMain from "./GroupMain.js";
import Settings from './Settings';
import FAQ from './FAQ';
import UploaderPage from './UploadDocsPage.js';
import Quiz from './Quiz';
import CustomizeQuiz from './CustomizeQuiz';
import QuizCreated from './QuizCreated';
import Chatbot from './chatbot.js';

import { QuizNameProvider } from './QuizNameContext';
import { UserProvider } from './components/UserContext';
import { QuizProvider } from './components/QuizContext';
import { S3Provider } from './components/S3Context';
import QuizQuestions from './components/QuizQuestions';
import { S3ObjsProvider } from './components/S3Objs';

import './App.css';
import huskyLogo from './imgs/huskysync.png'; 

Amplify.configure(awsconfig);

function App() {
  const { tokens } = useTheme();

  const components = {
    Header() {
      return (
        <div>
          <View>
            <Image alt="HuskySync Logo" src={huskyLogo} />
          </View>
        </div>
      );
    },
    Footer() {
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Text color={tokens.colors.neutral[80]}>
            &copy; 2024 HuskySync
          </Text>
        </View>
      );
    }
  };


  const lightPurple = '#E5DDF4'; 

  return (
    <>
      <style>
        {`
          .amplify-button--primary {
            background-color: ${lightPurple} !important;
          }
          [data-amplify-authenticator] {
            --amplify-components-button-primary-background-color: ${lightPurple};
            --amplify-components-tabs-item-active-border-color: ${lightPurple};
            --amplify-components-tabs-item-active-color: ${lightPurple};
            --amplify-components-button-link-color: ${lightPurple};
            --amplify-colors-brand-primary-80: ${lightPurple};
            --amplify-colors-brand-primary-60: ${lightPurple};
          }
          /* Other components you wish to style with the light purple color */
        `}
      </style>
      <S3ObjsProvider>
      <QuizProvider>
      <S3Provider>
      <QuizNameProvider>
      <UserProvider>
      <Authenticator components={components}>
          <BrowserRouter>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/GroupMain" element={<GroupMain />} />
                <Route path="/QuizQuestions" element={<QuizQuestions />}/>
                <Route path="/Settings" element={<Settings />} />
                <Route path="/FAQ" element={<FAQ />} />
                <Route path="/Upload" element={<UploaderPage />} />
                <Route path="/Quiz" element={<Quiz />} />
                <Route path="/CustomizeQuiz" element={<CustomizeQuiz />} />
                <Route path="/QuizCreated" element={<QuizCreated />} />
                <Route path="/QuizQs" element={<QuizQuestions />} />
                <Route path="/chat" element={<Chatbot/>} />

              </Routes>
            </div>
          </BrowserRouter>
      </Authenticator>
      </UserProvider>
      </QuizNameProvider>
      </S3Provider>
      </QuizProvider>
      </S3ObjsProvider>
    </>
  );
}

export default App;
