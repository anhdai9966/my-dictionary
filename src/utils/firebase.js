// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBmLbpaDou_A4XFLBBHc6rOasJR8qPvZSw',
    authDomain: 'dictionary-api-cd9966.firebaseapp.com',
    databaseURL: 'https://dictionary-api-cd9966-default-rtdb.firebaseio.com',
    projectId: 'dictionary-api-cd9966',
    storageBucket: 'dictionary-api-cd9966.appspot.com',
    messagingSenderId: '551188233904',
    appId: '1:551188233904:web:b0fe55dd176cc32f430575',
    measurementId: 'G-K507MKYSJX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

// {
//     "auth": {
//       "uid": "b8da8cb4-1120-4a77-bafc-4a3669bb3cfa",
//       "token": {
//         "sub": "b8da8cb4-1120-4a77-bafc-4a3669bb3cfa",
//         "firebase": {
//           "sign_in_provider": "google.com"
//         },
//         "email": "",
//         "email_verified": false,
//         "phone_number": "",
//         "name": ""
//       }
//     },
//     "resource": {
//       "key": "value"
//     },
//     "path": "/",
//     "method": "get",
//     "time": "2022-10-11T23:24:59.934Z",
//     "isAdmin": false
//   }