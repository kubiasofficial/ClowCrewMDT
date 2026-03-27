// Firebase inicializace pro ClowCrew MDT
// Tento soubor načítej vždy před script.js

// Firebase SDK
// (musí být už v index.html načteny <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"></script> a database-compat.js)

const firebaseConfig = {
    apiKey: "AIzaSyBw3LJGE1vUcWI1W_Y9cmDRJUrboOpoD9I",
    authDomain: "clowcrewmdt.firebaseapp.com",
    projectId: "clowcrewmdt",
    storageBucket: "clowcrewmdt.appspot.com",
    messagingSenderId: "1006837452788",
    appId: "1:1006837452788:web:9d2917d3e2ff30ad93f3a1"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database("https://clowcrewmdt-default-rtdb.europe-west1.firebasedatabase.app/");
