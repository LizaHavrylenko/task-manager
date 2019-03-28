import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/sass/styles.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';


export const storage = window.localStorage;
 
ReactDOM.render(<App />, document.getElementById('root'));
 
serviceWorker.unregister();
