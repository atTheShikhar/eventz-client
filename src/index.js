import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalState from './context/GlobalState';

ReactDOM.render(
    <GlobalState>
        <App />
    </GlobalState>
,document.getElementById('root'));
