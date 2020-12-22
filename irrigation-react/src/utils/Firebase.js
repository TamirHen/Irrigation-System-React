import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyCmWhdLsNWdcoy5n73aVuX2Wb17Qkw4MKw",
    authDomain: "smart-irrigation-system-854fa.firebaseapp.com",
    databaseURL: "https://smart-irrigation-system-854fa.firebaseio.com",
    projectId: "smart-irrigation-system-854fa",
    storageBucket: "smart-irrigation-system-854fa.appspot.com",
    messagingSenderId: "175621433547",
    appId: "1:175621433547:web:f80840fa5b9790147cd34e",
    measurementId: "G-C6JDMHJCFC"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
