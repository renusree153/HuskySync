import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@aws-amplify/ui-react/styles.css'
import { Amplify } from 'aws-amplify'; 
import config from "./aws-exports"
import { ThemeProvider } from '@aws-amplify/ui-react';


Amplify.configure(config)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);