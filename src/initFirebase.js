// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDvoXTdYdLPnBi3i4nsBC8Q4fLcG-rS5UQ',
  authDomain: 'bierwijn-taxi.firebaseapp.com',
  databaseURL:
    'https://bierwijn-taxi-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'bierwijn-taxi',
  storageBucket: 'bierwijn-taxi.appspot.com',
  messagingSenderId: '581057400400',
  appId: '1:581057400400:web:c1dc5ffb7910ce4269cb55',
  measurementId: 'G-N600KYRTPF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
