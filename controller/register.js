// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, where, query, updateDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
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

        var email = document.getElementById("email")
        var name = document.getElementById("name")
        var password = document.getElementById("contra")
        var confir = document.getElementById("contra_confir")
        var btnRegister = document.getElementById("register")
        var toast = document.querySelector(".toast")
        var pToast = document.querySelector(".p_toast")

        btnRegister.addEventListener("click", () => {
            if (email.value.length != 0) {
                if (name.value.length != 0) {
                    if (password.value.length != 0) {
                        if (confir.value.length != 0) {
                            if (confir.value == password.value) {

                                onAuthStateChanged(auth, (user) => {
                                    if (user) {
                                        const uid = user.uid;

                                        createUserWithEmailAndPassword(auth, email.value, password.value)
                                            .then((userCredential) => {
                                                const user = userCredential.user;
                                                sendEmailVerification(user)
                                                    .then(() => {
                                                        addDoc(collection(db, "Admins", user.uid, "Private_Data"), {
                                                            Correo: email.value,
                                                            Id: user.uid,
                                                            Nombre: name.value,
                                                            Rol: "Administrador",
                                                            DarkMode: "desactive",
                                                            URL: ""
                                                        });

                                                        addDoc(collection(db, "Admins_Entity", "Admins", "Private_Data"), {
                                                            Correo: email.value,
                                                            Nombre: name.value,
                                                            Rol: "Administrador",
                                                            DarkMode: "desactive",
                                                            URL: ""
                                                        });
                                                    })

                                                toast.style.background = "#30bf6c";
                                                toast.classList.add("active");
                                                pToast.textContent = "¡Listo! tu admin ha sido registrado";
                                                setTimeout(() => toast.classList.remove("active"), 3000);

                                                

                                            }).catch((error) => {
                                                toast.style.background = "#e15a5a";
                                                toast.classList.add("active");
                                                pToast.textContent = "No logramos registrar tu usuario";
                                                setTimeout(() => toast.classList.remove("active"), 3000);
                                                console.error("Error:", error);
                                            });
                                    } else {
                                        var out = document.querySelector('.out')

                                        out.classList.add('active')
                                    }
                                });

                            } else {
                                toast.style.background = "#e15a5a"
                                toast.classList.add("active")
                                pToast.textContent = "Contraseñas diferentes"
                                setTimeout(() => toast.classList.remove("active"), 3000)
                            }
                        } else {
                            toast.style.background = "#e15a5a"
                            toast.classList.add("active")
                            pToast.textContent = "Debes confirmar la contraseña"
                            setTimeout(() => toast.classList.remove("active"), 3000)
                        }
                    } else {
                        toast.style.background = "#e15a5a"
                        toast.classList.add("active")
                        pToast.textContent = "Debes digitar la contraseña"
                        setTimeout(() => toast.classList.remove("active"), 3000)
                    }
                } else {
                    toast.style.background = "#e15a5a"
                    toast.classList.add("active")
                    pToast.textContent = "Debes digitar un nombre"
                    setTimeout(() => toast.classList.remove("active"), 3000)
                }
            } else {
                toast.style.background = "#e15a5a"
                toast.classList.add("active")
                pToast.textContent = "Debes digitar un Email"
                setTimeout(() => toast.classList.remove("active"), 3000)
            }
        })

        var eye = document.querySelector("#eye")

        eye.addEventListener('click', () => {
            eye.classList.toggle('active')

            if (contra.type == "password") {
                contra.type = "text"
            } else if (contra.type == "text") {
                contra.type = "password"
            }
        })

    } else {
        var out = document.querySelector('.out')

        out.classList.add('active')
    }
});



