import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
// import AppDash from './Dashboard/AppDashboard.js';
import { ThemeProvider } from './Dashboard/context/ThemeContext.js';
import { AppWrapper } from './Dashboard/components/common/PageMeta.js';

// import Home from './Pages/Home.jsx';
// const root = ReactDOM.createRoot(document.getElementById('root'));

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <ThemeProvider>
      <AppWrapper>
      <App />

      </AppWrapper>
    </ThemeProvider>
  </StrictMode>,
)
