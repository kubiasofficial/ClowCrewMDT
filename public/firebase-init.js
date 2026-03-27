// Firebase + Firestore modular SDK (ESM)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBw3LJGE1vUcWI1W_Y9cmDRJUrboOpoD9I",
    authDomain: "clowcrewmdt.firebaseapp.com",
    projectId: "clowcrewmdt",
    storageBucket: "clowcrewmdt.appspot.com",
    messagingSenderId: "1006837452788",
    appId: "1:1006837452788:web:9d2917d3e2ff30ad93f3a1",
    databaseURL: "https://clowcrewmdt-default-rtdb.europe-west1.firebasedatabase.app/"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
