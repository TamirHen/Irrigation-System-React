import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Background from './components/Background';

ReactDOM.render(
  <>
    <Background style={{ zIndex: 0 }} />
    <App />
  </>,
  document.getElementById('root'),
);

reportWebVitals();
