import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./fonts/', true, /\.*/));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
