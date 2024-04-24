import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Amplify } from "aws-amplify";
import awsconfig from './aws-exports';
import { Authenticator, View, Image, Text, useTheme } from '@aws-amplify/ui-react';
import NavBar from './components/Navbar';  // Assuming this is your navbar component
import Home from './Home.js';
import GroupMain from "./GroupMain.js";
import Settings from './Settings';
import FAQ from './FAQ';
import UploaderPage from './UploadDocsPage.js';
import Quiz from './Quiz';

import './App.css';
import huskyLogo from './imgs/huskysync.png'; // Adjust the path if necessary

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


  // Define your light purple color
  const lightPurple = '#CAB8FF'; // Light purple color hex code

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
      <Authenticator components={components}>
          <BrowserRouter>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/GroupMain" element={<GroupMain />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="/FAQ" element={<FAQ />} />
                <Route path="/Upload" element={<UploaderPage />} />
                <Route path="/Quiz" element={<Quiz />} />
              </Routes>
            </div>
          </BrowserRouter>
      </Authenticator>
    </>
  );
}

export default App;
