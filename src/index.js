import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import AppRouter from './routers/AppRouter';
import { firebase } from './firebase/firebase';

ReactDOM.render(<AppRouter />, document.getElementById('root'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        localStorage.setItem('email', user.email);
        localStorage.setItem('isLoggedIn', true);
        
    } else {
        localStorage.setItem('isLoggedIn', false);
    }
});
