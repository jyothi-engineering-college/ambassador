// firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC_loWtvr_XK1fVaaJdji9RhDzLdpTaOjg",
    authDomain: "virtuosimusiq-d7d13.firebaseapp.com",
    projectId: "virtuosimusiq-d7d13",
    storageBucket: "virtuosimusiq-d7d13.appspot.com",
    messagingSenderId: "933659235303",
    appId: "1:933659235303:web:2596fc1167b705a6eae342",
    measurementId: "G-X5J5T2Q5PC"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth };
