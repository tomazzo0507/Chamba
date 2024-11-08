import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

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
const auth = getAuth();
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;

        var email = document.getElementById("email");
        var name = document.getElementById("name");
        var password = document.getElementById("contra");
        var confir = document.getElementById("contra_confir");
        var btnRegister = document.getElementById("register");
        var toast = document.querySelector(".toast");
        var pToast = document.querySelector(".p_toast");

        btnRegister.addEventListener("click", () => {
            if (email.value.length != 0) {
                if (name.value.length != 0) {
                    if (password.value.length != 0) {
                        if (confir.value.length != 0) {
                            if (confir.value == password.value) {

                                createUserWithEmailAndPassword(auth, email.value, contra.value)
                                    .then((userCredential) => {
                                        // Signed in
                                        const user = userCredential.user;
                                        sendEmailVerification(auth.currentUser).
                                            then(() => {
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
                                                    Id: user.uid,
                                                    Nombre: name.value,
                                                    Rol: "Administrador",
                                                    DarkMode: "desactive",
                                                    URL: ""
                                                })
                                            })

                                        toast.style.background = "#79cb5f";
                                        toast.classList.add("active");
                                        pToast.textContent = "Ya registramos tu administrador";
                                        setTimeout(() => toast.classList.remove("active"), 3000);

                                    }).catch((error) => {
                                        const errorCode = error.code;
                                        const errorMessage = error.message;

                                        toast.style.background = "#e15a5a";
                                        toast.classList.add("active");
                                        pToast.textContent = "No se pudo registrar tu Administrador";
                                        setTimeout(() => toast.classList.remove("active"), 3000);
                                    });

                            } else {
                                toast.style.background = "#e15a5a";
                                toast.classList.add("active");
                                pToast.textContent = "Contraseñas diferentes";
                                setTimeout(() => toast.classList.remove("active"), 3000);
                            }
                        } else {
                            toast.style.background = "#e15a5a";
                            toast.classList.add("active");
                            pToast.textContent = "Debes confirmar la contraseña";
                            setTimeout(() => toast.classList.remove("active"), 3000);
                        }
                    } else {
                        toast.style.background = "#e15a5a";
                        toast.classList.add("active");
                        pToast.textContent = "Debes digitar la contraseña";
                        setTimeout(() => toast.classList.remove("active"), 3000);
                    }
                } else {
                    toast.style.background = "#e15a5a";
                    toast.classList.add("active");
                    pToast.textContent = "Debes digitar un nombre";
                    setTimeout(() => toast.classList.remove("active"), 3000);
                }
            } else {
                toast.style.background = "#e15a5a";
                toast.classList.add("active");
                pToast.textContent = "Debes digitar un Email";
                setTimeout(() => toast.classList.remove("active"), 3000);
            }
        });

        var eye = document.querySelector("#eye");

        eye.addEventListener('click', () => {
            eye.classList.toggle('active');

            if (contra.type == "password") {
                contra.type = "text";
            } else if (contra.type == "text") {
                contra.type = "password";
            }
        });
    } else {

        var out = document.querySelector('.out')
        out.classList.add('active')

    }
});

