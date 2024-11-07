// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, where } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBPGTRPBGdXYGg9DPgMOeox8oS0BFBYq8s",
    authDomain: "streaming-colombia.firebaseapp.com",
    projectId: "streaming-colombia",
    storageBucket: "streaming-colombia.firebasestorage.app",
    messagingSenderId: "897187196778",
    appId: "1:897187196778:web:7eeac1a574f14320507f13",
    measurementId: "G-JTJF1RCPY5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;

        var btnInfo = document.querySelector(".top_content");
        var contInfo = document.querySelector(".container_change-info");
        var changeInfo = document.querySelector(".change_info");

        btnInfo.addEventListener("click", () => {
            contInfo.classList.add("visible");
        });

        contInfo.addEventListener("click", (event) => {
            if (!changeInfo.contains(event.target)) {
                contInfo.classList.remove("visible");
            }
        });

        var btnContra = document.querySelector(".bottom_content");
        var contContra = document.querySelector(".container_change-contra");
        var changeContra = document.querySelector(".change_contra");

        btnContra.addEventListener("click", () => {
            contContra.classList.add("visible");
        });

        contContra.addEventListener("click", (event) => {
            if (!changeContra.contains(event.target)) {
                contContra.classList.remove("visible");
            }
        });

    } else {
        var out = document.querySelector('.out')

        out.classList.add('active')
    }
});
