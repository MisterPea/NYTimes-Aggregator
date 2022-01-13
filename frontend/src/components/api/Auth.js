import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyDetBYYx4c4S3g4JIOCEKgkxloRXq4CVtI',
  authDomain: 'nyt-aggregator.firebaseapp.com',
  databaseURL: 'https://nyt-aggregator.firebaseio.com',
  projectId: 'nyt-aggregator',
  storageBucket: 'nyt-aggregator.appspot.com',
  messagingSenderId: '967423304427',
  appId: '1:967423304427:web:f45aed30d2e4ea2c4654ae',
  measurementId: 'G-V32GK3JSP6',
});

export default firebase;
