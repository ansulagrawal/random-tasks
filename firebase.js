// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCzmVFUmRFfm_5_GMXcBkzKT7sNTW-4sSA",
    authDomain: "clone-db68d.firebaseapp.com",
    projectId: "clone-db68d",
    storageBucket: "clone-db68d.appspot.com",
    messagingSenderId: "691987832693",
    appId: "1:691987832693:web:b1ae24e7ee6d27370ebd3c",
    measurementId: "G-9X9J0XWEZ2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();