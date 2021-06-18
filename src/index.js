import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App'; /* The main App component to be rendered */
import './styles/index.css'; /* For setting global document styles: resetting unwanted white spaces in this case */

ReactDom.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));