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
            filtro.classList.remove('active')
            btnFilter.classList.remove('active')
            changeEstado.classList.remove('active')
        })

        close.addEventListener('click', () => {
            sidebar.classList.add("active");
            btnFilter.classList.remove('active')
            filtro.classList.remove('active')
            changeEstado.classList.remove('active')
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

        // img perfil

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                var img_perfil = document.querySelector('.img_perfil')

                getDocs(query(collection(db, "Admins", user.uid, "Private_Data"), where("Id", "==", user.uid)))
                .then ((querySnapshot) => {
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

        // filter 

        var btnFilter = document.querySelector('#filter')
        var filtro = document.querySelector('.filtro')

        var close_filtro = document.querySelector('#close_filtro')

        btnFilter.addEventListener('click', () => {
            sidebar.classList.remove("active");
            btnFilter.classList.toggle('active')
            filtro.classList.toggle('active')

            service.classList.remove('active')

            window.addEventListener('click', event => {
                if (event.target == filtro) {
                    filtro.classList.remove('active')
                    btnFilter.classList.remove('active')
                    service.classList.remove('active')
                }
            })

            estado.classList.remove('active')
        })

        close_filtro.addEventListener('click', () => {
            filtro.classList.remove('active')
            btnFilter.classList.remove('active')
            service.classList.remove('active')
        })

        var clean_filtro = document.querySelector('#clean_filtro')
        var input_filtro = document.querySelector('.input_filtro')
        var img_service = document.querySelector('.img_service')
        var estado_fitro = document.querySelector('#search')

        clean_filtro.addEventListener('click', () => {
            input_filtro.value = ''
            img_service.src = '/assets/fondoNetflix.png'
            estado_fitro.textContent = "Buscar"
            estado_fitro.className = "search"
        })

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

        var service = document.querySelector('.select_service')
        var btnService = document.querySelector('#open_service')

        var disney = document.querySelector('.disney')
        var apple = document.querySelector('.apple')
        var hbo = document.querySelector('.hbo')
        var netflix = document.querySelector('.netflix')
        var paramount = document.querySelector('.paramount')
        var prime = document.querySelector('.prime')
        var crunchyroll = document.querySelector('.crunchyroll')
        var directv = document.querySelector('.directv')
        var disneypremium = document.querySelector('.disneypremium')
        var spotify = document.querySelector('.spotify')
        var vix = document.querySelector('.vix')
        var youtube = document.querySelector('.youtube')

        btnService.addEventListener('click', () => {
            filtro.classList.remove('active')
            btnFilter.classList.remove('active')

            service.classList.toggle('active')

            window.addEventListener('click', event => {
                if (event.target == service) {
                    filtro.classList.add('active')
                    btnFilter.classList.add('active')
                    service.classList.remove('active')
                }
            })

            disney.addEventListener('click', () => {
                filtro.classList.add('active')
                btnFilter.classList.add('active')
                service.classList.remove('active')

                img_service.src = "/assets/logo_disney.jpg"
            })

            apple.addEventListener('click', () => {
                filtro.classList.add('active')
                btnFilter.classList.add('active')
                service.classList.remove('active')

                img_service.src = "/assets/logo_apple.png"
            })

            hbo.addEventListener('click', () => {
                filtro.classList.add('active')
                btnFilter.classList.add('active')
                service.classList.remove('active')

                img_service.src = "/assets/logo_hbo.png"
            })

            netflix.addEventListener('click', () => {
                filtro.classList.add('active')
                btnFilter.classList.add('active')
                service.classList.remove('active')

                img_service.src = "/assets/logo_netflix.png"
            })

            paramount.addEventListener('click', () => {
                filtro.classList.add('active')
                btnFilter.classList.add('active')
                service.classList.remove('active')

                img_service.src = "/assets/logo_paramount.png"
            })

            prime.addEventListener('click', () => {
                filtro.classList.add('active')
                btnFilter.classList.add('active')
                service.classList.remove('active')

                img_service.src = "/assets/logo_prime.png"
            })

            crunchyroll.addEventListener('click', () => {
                filtro.classList.add('active')
                btnFilter.classList.add('active')
                service.classList.remove('active')

                img_service.src = "/assets/logo_crunchyroll.png"
            })

            directv.addEventListener('click', () => {
                filtro.classList.add('active')
                btnFilter.classList.add('active')
                service.classList.remove('active')

                img_service.src = "/assets/logo_directv.png"
            })

            disneypremium.addEventListener('click', () => {
                filtro.classList.add('active')
                btnFilter.classList.add('active')
                service.classList.remove('active')

                img_service.src = "/assets/logo_disneypremium.png"
            })

            spotify.addEventListener('click', () => {
                filtro.classList.add('active')
                btnFilter.classList.add('active')
                service.classList.remove('active')

                img_service.src = "/assets/logo_spotify.jpg"
            })

            vix.addEventListener('click', () => {
                filtro.classList.add('active')
                btnFilter.classList.add('active')
                service.classList.remove('active')

                img_service.src = "/assets/logo_vix.jpg"
            })

            youtube.addEventListener('click', () => {
                filtro.classList.add('active')
                btnFilter.classList.add('active')
                service.classList.remove('active')

                img_service.src = "/assets/logo_youtube.png"
            })
        })

        // Select Estado

        var estado = document.querySelector('.select_estado')
        var btnEstado = document.querySelector('#search')

        var activo = document.querySelector('.content_select-estado #activo')
        var inactivo = document.querySelector('.content_select-estado #inactivo')
        var danado = document.querySelector('.content_select-estado #danado')
        var disponible = document.querySelector('.content_select-estado #disponible')

        btnEstado.addEventListener('click', () => {
            filtro.classList.remove('active')
            btnFilter.classList.remove('active')

            estado.classList.add('active')

            window.addEventListener('click', event => {
                if (event.target == estado) {
                    filtro.classList.add('active')
                    btnFilter.classList.add('active')
                    estado.classList.remove('active')
                }
            })

            activo.addEventListener('click', () => {
                btnEstado.textContent = "Activo"
                btnEstado.className = "activo"
                filtro.classList.add('active')
                btnFilter.classList.add('active')
                estado.classList.remove('active')
            })

            inactivo.addEventListener('click', () => {
                btnEstado.textContent = "Inactivo"
                btnEstado.className = "inactivo"
                filtro.classList.add('active')
                btnFilter.classList.add('active')
                estado.classList.remove('active')
            })

            danado.addEventListener('click', () => {
                btnEstado.textContent = "Dañado"
                btnEstado.className = "danado"
                filtro.classList.add('active')
                btnFilter.classList.add('active')
                estado.classList.remove('active')
            })

            disponible.addEventListener('click', () => {
                btnEstado.textContent = "Disponible"
                btnEstado.className = "disponible"
                filtro.classList.add('active')
                btnFilter.classList.add('active')
                estado.classList.remove('active')
            })
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

        // Change estado

        var btnEstado2 = document.querySelector('#estado')
        var changeEstado = document.querySelector('.change_estado')
        var close_changeEstado = document.querySelector('.content_change-estado i')

        var estadoActivo = document.querySelector('.p_change-estado #activo')
        var estadoInactivo = document.querySelector('.p_change-estado #inactivo')
        var estadoDanado = document.querySelector('.p_change-estado #danado')
        var estadoDisponible = document.querySelector('.p_change-estado #disponible')
        var estadoReserva = document.querySelector('.p_change-estado #reserva')

        btnEstado2.addEventListener('click', () => {
            changeEstado.classList.toggle('active')

            close_changeEstado.addEventListener('click', () => {
                changeEstado.classList.remove('active')
            })

            window.addEventListener('click', event => {
                if (event.target == changeEstado) {
                    changeEstado.classList.remove('active')
                }
            })

            estadoActivo.addEventListener('click', () => {
                btnEstado2.className = "activo"
                btnEstado2.textContent = "Activo"
                changeEstado.classList.remove('active')
            })
            estadoInactivo.addEventListener('click', () => {
                btnEstado2.className = "inactivo"
                btnEstado2.textContent = "Inactivo"
                changeEstado.classList.remove('active')
            })
            estadoDanado.addEventListener('click', () => {
                btnEstado2.className = "danado"
                btnEstado2.textContent = "Dañada"
                changeEstado.classList.remove('active')
            })
            estadoDisponible.addEventListener('click', () => {
                btnEstado2.className = "disponible"
                btnEstado2.textContent = "Disponible"
                changeEstado.classList.remove('active')
            })
            estadoReserva.addEventListener('click', () => {
                btnEstado2.className = "reserva"
                btnEstado2.textContent = "Reservada"
                changeEstado.classList.remove('active')
            })
        })

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

    } else {
        var out = document.querySelector('.out')

        out.classList.add('active')
    }
});

