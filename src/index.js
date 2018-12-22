import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ActionCableProvider } from 'react-actioncable-provider';
import * as serviceWorker from './serviceWorker';
import { API_WS_ROOT } from './constants';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";

ReactDOM.render(
    <ActionCableProvider url={API_WS_ROOT}>
        <Router>
            <App />
        </Router>
    </ActionCableProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
