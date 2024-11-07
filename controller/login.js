// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
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

var login = document.querySelector(".login")
var user = document.querySelector(".user")
var contra = document.querySelector(".contra")

var toast = document.querySelector(".toast")
var pToast = document.querySelector(".p_toast")

login.addEventListener("click", () =>  {

    if (user.value.length != 0) {
        if (contra.value.length != 0) {

            signInWithEmailAndPassword(auth, user.value, contra.value)
            .then ((userCredential) => {
                const user = userCredential.user;

                if (getAuth().currentUser.emailVerified) {
                    location.href = "/views/inside.html"
                } else {
                    toast.style.background = "#8955bd"
                    toast.classList.add("active")
                    pToast.textContent = "Parece que no has verificado tu Email"
                    setTimeout(() => toast.classList.remove("active"), 3000)
                }
            }) .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                toast.classList.add("active")
                pToast.textContent = "Correo o contraseña incorrectos"
                setTimeout(() => toast.classList.remove("active"), 3000)
            })

        } else {
            toast.classList.add("active")
            pToast.textContent = "Debes ingresar tu contraseña"
            setTimeout(() => toast.classList.remove("active"), 3000)
        }
    } else {
        toast.classList.add("active")
        pToast.textContent = "Debes ingresar el Email"
        setTimeout(() => toast.classList.remove("active"), 3000)
    }

})

// eye

var eye = document.querySelector("#eye")

eye.addEventListener('click', () => {
    eye.classList.toggle('active')

    if (contra.type == "password") {
        contra.type = "text"
    } else if (contra.type == "text") {
        contra.type = "password"
    }
})

// remember

var btnUps = document.querySelector(".ups")
var container_ups = document.querySelector(".container_ups")

btnUps.addEventListener("click", () => {
    container_ups.classList.toggle("active")

    window.addEventListener('click', event => {
        if (event.target == container_ups) {
            container_ups.classList.remove('active')
        }
    })
})





