import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

axios.interceptors.request.use((config) => {
  config.headers['Access-Control-Allow-Origin'] = 'http://localhost:8080';
  return config;
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


