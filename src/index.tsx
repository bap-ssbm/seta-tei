import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import './i18n';
import ScrollToTop from './ScrollToTop';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop/>
      <App />
    </Router>
  </React.StrictMode>
);


