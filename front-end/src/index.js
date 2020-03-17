import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './helpers';
import { App } from './pages/App';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications-component/dist/theme.css'
import './styles/login.css'
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);