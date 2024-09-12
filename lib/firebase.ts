import { type FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyCP9Ol1XPEOmBIhERuYG5Wj3V_lf8XbYTI",
    authDomain: "my-movie-app-e65cd.firebaseapp.com",
    projectId: "my-movie-app-e65cd",
    storageBucket: "my-movie-app-e65cd.appspot.com",
    messagingSenderId: "689156949685",
    appId: "1:689156949685:web:1543e4ce5351f497d9a0fc",
    measurementId: "G-G9MWDCFRJC"
};

export const firebaseApp = initializeApp(firebaseConfig)
export const authentication = getAuth(firebaseApp)