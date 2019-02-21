import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDATuG0F100m57FzvujbTJxRvGloSu86F8",
    authDomain: "notes-app-d38b3.firebaseapp.com",
    databaseURL: "https://notes-app-d38b3.firebaseio.com",
    projectId: "notes-app-d38b3",
    storageBucket: "notes-app-d38b3.appspot.com",
    messagingSenderId: "171545040082"
};

firebase.initializeApp(config);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider };