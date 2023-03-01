import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomeScreen from './components/HomeScreen/HomeScreen.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HomeScreen />
  </React.StrictMode>
);
