import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';

import { AppWrapper } from './Dashboard/components/common/PageMeta.js';
import { CategoryProvider } from './Dashboard/ContextApi/CategoryContextApi.jsx';
import { BlogCategoryProvider } from './Dashboard/ContextApi/BlogCategoryContextApi.jsx';
import { PortfolioCategoryProvider } from './Dashboard/ContextApi/PortfolioCategoryContextApi.jsx';

// import Home from './Pages/Home.jsx';
// const root = ReactDOM.createRoot(document.getElementById('root'));

createRoot(document.getElementById('root')).render(
  <StrictMode>

  
      <AppWrapper>
        <CategoryProvider>
          <BlogCategoryProvider >
            <PortfolioCategoryProvider>
          <App />
          </PortfolioCategoryProvider>
          </BlogCategoryProvider>
        </CategoryProvider>
      </AppWrapper>

  </StrictMode>,
)
