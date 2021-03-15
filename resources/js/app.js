import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';

require('./bootstrap');

if(document.getElementById('root')){
    ReactDOM.render(<App/>, document.getElementById('root'));
}
