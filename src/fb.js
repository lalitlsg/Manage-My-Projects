import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAL4BMllosPP6hOWcevHvMEFjtIVTrxn5Q",
    authDomain: "todo-lalit.firebaseapp.com",
    databaseURL: "https://todo-lalit.firebaseio.com",
    projectId: "todo-lalit",
    storageBucket: "todo-lalit.appspot.com",
    messagingSenderId: "338582989877"
  };
firebase.initializeApp(config);
const db = firebase.firestore();

db.settings({timestampsInSnapshots:true});

export default db;