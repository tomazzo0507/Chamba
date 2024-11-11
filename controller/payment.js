// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, where, query, updateDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
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

        var btn = document.querySelector("#btn")
        var sidebar = document.querySelector(".sidebar")

        var close = document.querySelector('#close')
        var x = document.querySelector('#x')

        sidebar.classList.add("small");

        btn.addEventListener("click", () => {
            sidebar.classList.toggle("small");
        })

        close.addEventListener('click', () => {
            sidebar.classList.add("active");
        })

        x.addEventListener('click', () => {
            sidebar.classList.remove("active");
        })

        // Dark Mode

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                const body = document.body
                const checkbox = document.querySelector('.theme-switch__checkbox');
                const palanca = document.querySelector('.theme-switch__checkbox')

                getDocs(query(collection(db, "Admins", user.uid, "Private_Data"), where("Id", "==", user.uid))).
                    then((querySnapshot) => {
                        querySnapshot.forEach((doc2) => {
                            getDoc(doc(db, "Admins", user.uid, "Private_Data", doc2.data().DarkMode)).
                                then((docSnap) => {
                                    if (doc2.data().DarkMode == "desactive") {
                                        body.classList.remove('dark-mode')
                                        checkbox.checked = false
                                    }
                                    else if (doc2.data().DarkMode == "active") {
                                        body.classList.add('dark-mode')
                                        checkbox.checked = true
                                    }
                                    else {
                                        body.classList.add('dark-mode')
                                        checkbox.checked = true
                                    }
                                })
                        })
                    })

                palanca.addEventListener('click', () => {
                    getDocs(query(collection(db, "Admins", user.uid, "Private_Data"), where("Id", "==", user.uid))).
                        then((querySnapshot) => {
                            querySnapshot.forEach((doc2) => {
                                getDoc(doc(db, "Admins", user.uid, "Private_Data", doc2.data().DarkMode)).
                                    then((docSnap) => {
                                        if (doc2.data().DarkMode == "desactive") {
                                            getDocs(collection(db, "Admins", user.uid, "Private_Data"))
                                                .then((querySnapshot) => {
                                                    querySnapshot.forEach((doc) => {
                                                        updateDoc(doc.ref, {
                                                            DarkMode: 'active'
                                                        })
                                                    })
                                                })
                                            body.classList.add('dark-mode')
                                            checkbox.checked = true
                                        }
                                        else if (doc2.data().DarkMode == "active") {
                                            getDocs(collection(db, "Admins", user.uid, "Private_Data"))
                                                .then((querySnapshot) => {
                                                    querySnapshot.forEach((doc) => {
                                                        updateDoc(doc.ref, {
                                                            DarkMode: 'desactive'
                                                        })
                                                    })
                                                })
                                            body.classList.remove('dark-mode')
                                            checkbox.checked = false
                                        }
                                        else {
                                            getDocs(collection(db, "Admins", user.uid, "Private_Data"))
                                                .then((querySnapshot) => {
                                                    querySnapshot.forEach((doc) => {
                                                        updateDoc(doc.ref, {
                                                            DarkMode: 'desactive'
                                                        })
                                                    })
                                                })
                                            body.classList.remove('dark-mode')
                                            checkbox.checked = false
                                        }
                                    })
                            })
                        })
                })

            } else {
                var out = document.querySelector('.out')

                out.classList.add('active')
            }
        });

        // name and email

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                var name = document.querySelector('.name')
                var rol = document.querySelector('.rol')

                getDocs(query(collection(db, "Admins", user.uid, "Private_Data"), where("Id", "==", user.uid)))
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            let texto = doc.data().Nombre
                            let nombres = texto.split(" ").slice(0, 2).join(" ");

                            name.textContent = nombres
                            rol.textContent = doc.data().Rol
                        })
                    })

            } else {
                var out = document.querySelector('.out')

                out.classList.add('active')
            }
        });

        // img perfil

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                var img_perfil = document.querySelector('.img_perfil')

                getDocs(query(collection(db, "Admins", user.uid, "Private_Data"), where("Id", "==", user.uid)))
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (doc.data().URL == "") {
                                img_perfil.src = "/assets/profile.png"
                            } else {
                                img_perfil.src = doc.data().URL
                            }
                        })
                    })

            } else {
                var out = document.querySelector('.out')

                out.classList.add('active')
            }
        });

        // side menu

        var btnService = document.querySelector("#services")
        var btnInicio = document.querySelector("#inicio")
        var btnCobros = document.querySelector("#payment")
        var btnUsers = document.querySelector("#users")
        var btnAdmins = document.querySelector("#personal")
        var btnSettings = document.querySelector("#config")

        btnService.addEventListener("click", () => {
            location.href = "/views/services.html"
        })

        btnInicio.addEventListener("click", () => {
            location.href = "/views/inside.html"
        })

        btnCobros.addEventListener("click", () => {
            location.href = "/views/payment.html"
        })

        btnUsers.addEventListener('click', () => {
            window.open("/views/register_users.html", "_blank");
        })

        btnAdmins.addEventListener('click', () => {
            location.href = "/views/personal.html";
        })

        btnSettings.addEventListener("click", () => {
            location.href = "/views/settings.html"
        })

        // out

        var out = document.querySelector('#out')

        var toast = document.querySelector(".toast")
        var pToast = document.querySelector(".p_toast")

        out.addEventListener("click", () => {
            toast.classList.add("active")
            toast.style.cursor = "pointer"
            pToast.textContent = "Presiona esta alerta para salir"
            setTimeout(() => toast.classList.remove("active"), 5000)

            toast.addEventListener('click', () => {
                signOut(auth).then(() => {
                    location.href = "/index.html"
                }).catch((error) => {
                    toast.classList.add("active")
                    pToast.textContent = "Ooops, hubo un error al cerrar sesion"
                    setTimeout(() => toast.classList.remove("active"), 3000)
                });
            })
        })

        // Mostrar Users

        var tbody = document.querySelector('.tbody')
        var service = document.querySelector('.select_service')

        var btn_fecha = document.querySelector('.date')
        var fecha = document.querySelector('.select_fecha')

        var fecha_p = document.querySelectorAll('.fecha p')

        fecha.classList.add('active')

        btn_fecha.addEventListener('click', () => {
            fecha.classList.toggle('active')
            window.addEventListener('click', event => {
                if (event.target == fecha) {
                    fecha.classList.remove('active')
                }
            })
        })

        var fechaSeleccionada = ""

        fecha_p.forEach((elemento) => {
            elemento.addEventListener('click', () => {
                fecha.classList.remove('active')
                fechaSeleccionada = elemento.textContent

                tbody.innerHTML = ""

                getDocs(collection(db, "Users", "SUw3PRfA", "Private_Data"))
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {

                            var diaUser = doc.data().Fecha.split("/")[0]

                            if (fechaSeleccionada == diaUser) {
                                var tr = document.createElement('tr')
                                var nombre = document.createElement('th')
                                var correo = document.createElement('th')
                                var cuenta_padre = document.createElement('th')
                                var number = document.createElement('th')
                                var img_servicio
                                var servicio = document.createElement('th')
                                var cont_servicio = document.createElement('div')
                                var estado = document.createElement('th')
                                var p_estado = document.createElement('p')

                                nombre.textContent = doc.data().Nombre
                                correo.textContent = doc.data().Correo
                                cuenta_padre.textContent = doc.data().Correo_Padre
                                number.textContent = doc.data().Telefono

                                let servicios = doc.data().Servicio.split(", ")

                                if (servicios.length > 1) {
                                    p_estado.addEventListener('click', () => {
                                        service.classList.toggle('active')

                                        window.addEventListener('click', event => {
                                            if (event.target == service) {
                                                service.classList.remove('active')
                                            }
                                        })

                                    })

                                    cont_servicio.className = "servicios"

                                    for (var i = 0; i < servicios.length; i++) {
                                        img_servicio = document.createElement("img")

                                        if (servicios[i] == "Prime Video") {
                                            img_servicio.src = "/assets/logo_prime.png"
                                        }

                                        if (servicios[i] == "Netflix") {
                                            img_servicio.src = "/assets/logo_netflix.png"
                                        }

                                        if (servicios[i] == "Spotify") {
                                            img_servicio.src = "/assets/logo_spotify.jpg"
                                        }

                                        if (servicios[i] == "Vix") {
                                            img_servicio.src = "/assets/logo_vix.jpg"
                                        }

                                        if (servicios[i] == "HBO") {
                                            img_servicio.src = "/assets/logo_hbo.png"
                                        }

                                        if (servicios[i] == "Disney+") {
                                            img_servicio.src = "/assets/logo_disney.jpg"
                                        }

                                        if (servicios[i] == "Disney+ Premium") {
                                            img_servicio.src = "/assets/logo_disneypremium.png"
                                        }

                                        if (servicios[i] == "Paramount+") {
                                            img_servicio.src = "/assets/logo_paramount.png"
                                        }

                                        if (servicios[i] == "DirecTV") {
                                            img_servicio.src = "/assets/logo_directv.png"
                                        }

                                        if (servicios[i] == "Crunchyroll") {
                                            img_servicio.src = "/assets/logo_crunchyroll.png"
                                        }

                                        if (servicios[i] == "YouTube") {
                                            img_servicio.src = "/assets/logo_youtube.png"
                                        }

                                        if (servicios[i] == "Apple TV") {
                                            img_servicio.src = "/assets/logo_apple.png"
                                        }

                                        if (servicios.length > 6) {
                                            cont_servicio.style.display = "grid"
                                            cont_servicio.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr 1fr"
                                        }

                                        cont_servicio.appendChild(img_servicio)
                                    }

                                } else {

                                    p_estado.addEventListener('click', () => {
                                        alert(`Cobro enviado por pago de ${doc.data().Servicio}`)
                                    })

                                    img_servicio = document.createElement('img')

                                    cont_servicio.className = "servicio"

                                    if (doc.data().Servicio == "Prime Video") {
                                        img_servicio.src = "/assets/logo_prime.png"
                                    }

                                    if (doc.data().Servicio == "Netflix") {
                                        img_servicio.src = "/assets/logo_netflix.png"
                                    }

                                    if (doc.data().Servicio == "Spotify") {
                                        img_servicio.src = "/assets/logo_spotify.jpg"
                                    }

                                    if (doc.data().Servicio == "Vix") {
                                        img_servicio.src = "/assets/logo_vix.jpg"
                                    }

                                    if (doc.data().Servicio == "Disney+") {
                                        img_servicio.src = "/assets/logo_disney.jpg"
                                    }

                                    if (doc.data().Servicio == "Disney+ Premium") {
                                        img_servicio.src = "/assets/logo_disneypremium.png"
                                    }

                                    if (doc.data().Servicio == "Paramount+") {
                                        img_servicio.src = "/assets/logo_paramount.png"
                                    }

                                    if (doc.data().Servicio == "DirectTv") {
                                        img_servicio.src = "/assets/logo_.png"
                                    }

                                    if (doc.data().Servicio == "Crunchyroll") {
                                        img_servicio.src = "/assets/logo_crunchyroll.png"
                                    }

                                    if (doc.data().Servicio == "Youtube") {
                                        img_servicio.src = "/assets/logo_youtube.png"
                                    }

                                    if (doc.data().Servicio == "Apple TV") {
                                        img_servicio.src = "/assets/logo_apple.png"
                                    }

                                    cont_servicio.appendChild(img_servicio)

                                }

                                p_estado.textContent = "Cobrar"
                                p_estado.className = "inactivo"

                                tbody.appendChild(tr)
                                tr.appendChild(nombre)
                                tr.appendChild(correo)
                                tr.appendChild(cuenta_padre)
                                tr.appendChild(number)
                                tr.appendChild(servicio)
                                tr.appendChild(estado)
                                servicio.appendChild(cont_servicio)
                                estado.appendChild(p_estado)

                                // pay

                                var payAll = document.querySelector('#payAll')

                                payAll.addEventListener('click', () => {
                                    service.classList.toggle('active')

                                    window.addEventListener('click', event => {
                                        if (event.target == service) {
                                            service.classList.remove('active')
                                        }
                                    })
                                })
                            }

                        })
                    })
            })
        })

    } else {
        var out = document.querySelector('.out')
        out.classList.add('active')
    }
});

