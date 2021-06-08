import React, { Component } from 'react';
import ReactDom from 'react-dom';
import App from './App'; /* The main App component to be rendered */
import './index.css'; /* For setting global document styles: resetting unwanted white spaces in this case */

ReactDom.render(<App />, document.getElementById('root'));