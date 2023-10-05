// firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBfBRUhPj3ds5TsT6iySBHvtStREMvqft0",
  authDomain: "tharang2k2.firebaseapp.com",
  projectId: "tharang2k2",
  storageBucket: "tharang2k2.appspot.com",
  messagingSenderId: "772887975621",
  appId: "1:772887975621:web:d2b189c80b8cf17e8bc2ac",
  measurementId: "G-BE6DZDR7KH"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth };
