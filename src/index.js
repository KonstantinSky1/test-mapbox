import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App/App.jsx';
import { JsonPlaceholderContextProvider } from './contexts/JsonPlaceholderContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <JsonPlaceholderContextProvider>
        <App />
      </JsonPlaceholderContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);