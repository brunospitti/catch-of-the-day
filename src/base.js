// React - firebase
import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDpjCDuVevJZAnn9EbBS-Ohy4ZjKcre07Q",
    authDomain: "catch-of-the-day-bruno-spitti.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-bruno-spitti.firebaseio.com",
    // don't need these below, but I'll keep them just for reference
    projectId: "catch-of-the-day-bruno-spitti",
    storageBucket: "catch-of-the-day-bruno-spitti.appspot.com",
    messagingSenderId: "217264808093"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;