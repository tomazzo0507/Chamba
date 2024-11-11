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

            var tbody = document.querySelector('.tbody')
            tbody.innerHTML = ""

            getDocs(collection(db, "Users", "SUw3PRfA", "Private_Data"))
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

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


                        p_estado.textContent = doc.data().Estado
                        p_estado.className = doc.data().Estado.toLowerCase()


                        tbody.appendChild(tr)
                        tr.appendChild(nombre)
                        tr.appendChild(correo)
                        tr.appendChild(cuenta_padre)
                        tr.appendChild(number)
                        tr.appendChild(servicio)
                        tr.appendChild(estado)
                        servicio.appendChild(cont_servicio)
                        estado.appendChild(p_estado)

                        // Change estado

                        var btnEstado2 = document.querySelector('#estado')
                        var changeEstado = document.querySelector('.change_estado')
                        var close_changeEstado = document.querySelector('.content_change-estado i')

                        var estadoActivo = document.querySelector('.p_change-estado #activo')
                        var estadoInactivo = document.querySelector('.p_change-estado #inactivo')
                        var estadoDanado = document.querySelector('.p_change-estado #danado')
                        var estadoDisponible = document.querySelector('.p_change-estado #disponible')
                        var estadoReserva = document.querySelector('.p_change-estado #reserva')

                        p_estado.addEventListener('click', () => {
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
                    })
                })
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
            });

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

        disney.addEventListener("click", () => {
            var tbody = document.querySelector('.tbody')
            tbody.innerHTML = ""

            getDocs(collection(db, "Users", "SUw3PRfA", "Private_Data"))
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        if (doc.data().Servicio == "Disney+") {
                            var tbody = document.querySelector('.tbody')
                            var tr = document.createElement('tr')
                            var nombre = document.createElement('th')
                            var correo = document.createElement('th')
                            var cuentaPadre = document.createElement('th')
                            var fecha = document.createElement('th')
                            var th_servicio = document.createElement('th')
                            var div_servicio = document.createElement('div')
                            var img_servicio = document.createElement('img')
                            var th_estado = document.createElement('th')
                            var estado = document.createElement('p')

                            nombre.textContent = doc.data().Nombre
                            correo.textContent = doc.data().Correo
                            cuentaPadre.textContent = doc.data().Correo_Padre
                            fecha.textContent = doc.data().Fecha
                            img_servicio.src = "/assets/logo_disney.jpg"
                            estado.textContent = doc.data().Estado

                            div_servicio.className = "servicio"
                            estado.className = doc.data().Estado.toLowerCase()
                            estado.style.cursor = "auto"


                            tbody.appendChild(tr)
                            tr.appendChild(nombre)
                            tr.appendChild(correo)
                            tr.appendChild(cuentaPadre)
                            tr.appendChild(fecha)
                            tr.appendChild(th_servicio)
                            tr.appendChild(th_estado)
                            th_servicio.appendChild(div_servicio)
                            div_servicio.appendChild(img_servicio)
                            th_estado.appendChild(estado)
                        }

                        let servicios = doc.data().Servicio.split(", ")

                        if (servicios.length > 1) {
                            for (var i = 0; i < servicios.length; i++) {
                                if (servicios[i] == "Disney+") {
                                    var tbody = document.querySelector('.tbody')
                                    var tr = document.createElement('tr')
                                    var nombre = document.createElement('th')
                                    var correo = document.createElement('th')
                                    var cuentaPadre = document.createElement('th')
                                    var fecha = document.createElement('th')
                                    var th_servicio = document.createElement('th')
                                    var div_servicio = document.createElement('div')
                                    var img_servicio = document.createElement('img')
                                    var th_estado = document.createElement('th')
                                    var estado = document.createElement('p')

                                    nombre.textContent = doc.data().Nombre
                                    correo.textContent = doc.data().Correo
                                    cuentaPadre.textContent = doc.data().Correo_Padre
                                    fecha.textContent = doc.data().Fecha
                                    img_servicio.src = "/assets/logo_disney.jpg"
                                    estado.textContent = doc.data().Estado

                                    div_servicio.className = "servicio"
                                    estado.className = doc.data().Estado.toLowerCase()
                                    estado.style.cursor = "auto"


                                    tbody.appendChild(tr)
                                    tr.appendChild(nombre)
                                    tr.appendChild(correo)
                                    tr.appendChild(cuentaPadre)
                                    tr.appendChild(fecha)
                                    tr.appendChild(th_servicio)
                                    tr.appendChild(th_estado)
                                    th_servicio.appendChild(div_servicio)
                                    div_servicio.appendChild(img_servicio)
                                    th_estado.appendChild(estado)
                                }
                            }
                        }

                    })
                })
        });

        apple.addEventListener("click", () => {
            var tbody = document.querySelector('.tbody')
            tbody.innerHTML = ""

            getDocs(collection(db, "Users", "SUw3PRfA", "Private_Data"))
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        if (doc.data().Servicio == "Apple TV") {
                            var tbody = document.querySelector('.tbody')
                            var tr = document.createElement('tr')
                            var nombre = document.createElement('th')
                            var correo = document.createElement('th')
                            var cuentaPadre = document.createElement('th')
                            var fecha = document.createElement('th')
                            var th_servicio = document.createElement('th')
                            var div_servicio = document.createElement('div')
                            var img_servicio = document.createElement('img')
                            var th_estado = document.createElement('th')
                            var estado = document.createElement('p')

                            nombre.textContent = doc.data().Nombre
                            correo.textContent = doc.data().Correo
                            cuentaPadre.textContent = doc.data().Correo_Padre
                            fecha.textContent = doc.data().Fecha
                            img_servicio.src = "/assets/logo_apple.png"
                            estado.textContent = doc.data().Estado

                            div_servicio.className = "servicio"
                            estado.className = doc.data().Estado.toLowerCase()
                            estado.style.cursor = "auto"


                            tbody.appendChild(tr)
                            tr.appendChild(nombre)
                            tr.appendChild(correo)
                            tr.appendChild(cuentaPadre)
                            tr.appendChild(fecha)
                            tr.appendChild(th_servicio)
                            tr.appendChild(th_estado)
                            th_servicio.appendChild(div_servicio)
                            div_servicio.appendChild(img_servicio)
                            th_estado.appendChild(estado)
                        }

                        let servicios = doc.data().Servicio.split(", ")

                        if (servicios.length > 1) {
                            for (var i = 0; i < servicios.length; i++) {
                                if (servicios[i] == "Apple TV") {
                                    var tbody = document.querySelector('.tbody')
                                    var tr = document.createElement('tr')
                                    var nombre = document.createElement('th')
                                    var correo = document.createElement('th')
                                    var cuentaPadre = document.createElement('th')
                                    var fecha = document.createElement('th')
                                    var th_servicio = document.createElement('th')
                                    var div_servicio = document.createElement('div')
                                    var img_servicio = document.createElement('img')
                                    var th_estado = document.createElement('th')
                                    var estado = document.createElement('p')

                                    nombre.textContent = doc.data().Nombre
                                    correo.textContent = doc.data().Correo
                                    cuentaPadre.textContent = doc.data().Correo_Padre
                                    fecha.textContent = doc.data().Fecha
                                    img_servicio.src = "/assets/logo_apple.png"
                                    estado.textContent = doc.data().Estado

                                    div_servicio.className = "servicio"
                                    estado.className = doc.data().Estado.toLowerCase()
                                    estado.style.cursor = "auto"


                                    tbody.appendChild(tr)
                                    tr.appendChild(nombre)
                                    tr.appendChild(correo)
                                    tr.appendChild(cuentaPadre)
                                    tr.appendChild(fecha)
                                    tr.appendChild(th_servicio)
                                    tr.appendChild(th_estado)
                                    th_servicio.appendChild(div_servicio)
                                    div_servicio.appendChild(img_servicio)
                                    th_estado.appendChild(estado)
                                }
                            }
                        }

                    })
                })
        });

        hbo.addEventListener("click", () => {
            var tbody = document.querySelector('.tbody')
            tbody.innerHTML = ""

            getDocs(collection(db, "Users", "SUw3PRfA", "Private_Data"))
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        if (doc.data().Servicio == "HBO") {
                            var tbody = document.querySelector('.tbody')
                            var tr = document.createElement('tr')
                            var nombre = document.createElement('th')
                            var correo = document.createElement('th')
                            var cuentaPadre = document.createElement('th')
                            var fecha = document.createElement('th')
                            var th_servicio = document.createElement('th')
                            var div_servicio = document.createElement('div')
                            var img_servicio = document.createElement('img')
                            var th_estado = document.createElement('th')
                            var estado = document.createElement('p')

                            nombre.textContent = doc.data().Nombre
                            correo.textContent = doc.data().Correo
                            cuentaPadre.textContent = doc.data().Correo_Padre
                            fecha.textContent = doc.data().Fecha
                            img_servicio.src = "/assets/logo_hbo.png"
                            estado.textContent = doc.data().Estado

                            div_servicio.className = "servicio"
                            estado.className = doc.data().Estado.toLowerCase()
                            estado.style.cursor = "auto"


                            tbody.appendChild(tr)
                            tr.appendChild(nombre)
                            tr.appendChild(correo)
                            tr.appendChild(cuentaPadre)
                            tr.appendChild(fecha)
                            tr.appendChild(th_servicio)
                            tr.appendChild(th_estado)
                            th_servicio.appendChild(div_servicio)
                            div_servicio.appendChild(img_servicio)
                            th_estado.appendChild(estado)
                        }

                        let servicios = doc.data().Servicio.split(", ")

                        if (servicios.length > 1) {
                            for (var i = 0; i < servicios.length; i++) {
                                if (servicios[i] == "HBO") {
                                    var tbody = document.querySelector('.tbody')
                                    var tr = document.createElement('tr')
                                    var nombre = document.createElement('th')
                                    var correo = document.createElement('th')
                                    var cuentaPadre = document.createElement('th')
                                    var fecha = document.createElement('th')
                                    var th_servicio = document.createElement('th')
                                    var div_servicio = document.createElement('div')
                                    var img_servicio = document.createElement('img')
                                    var th_estado = document.createElement('th')
                                    var estado = document.createElement('p')

                                    nombre.textContent = doc.data().Nombre
                                    correo.textContent = doc.data().Correo
                                    cuentaPadre.textContent = doc.data().Correo_Padre
                                    fecha.textContent = doc.data().Fecha
                                    img_servicio.src = "/assets/logo_hbo.png"
                                    estado.textContent = doc.data().Estado

                                    div_servicio.className = "servicio"
                                    estado.className = doc.data().Estado.toLowerCase()
                                    estado.style.cursor = "auto"


                                    tbody.appendChild(tr)
                                    tr.appendChild(nombre)
                                    tr.appendChild(correo)
                                    tr.appendChild(cuentaPadre)
                                    tr.appendChild(fecha)
                                    tr.appendChild(th_servicio)
                                    tr.appendChild(th_estado)
                                    th_servicio.appendChild(div_servicio)
                                    div_servicio.appendChild(img_servicio)
                                    th_estado.appendChild(estado)
                                }
                            }
                        }

                    })
                })
        });

        netflix.addEventListener("click", () => {
            var tbody = document.querySelector('.tbody')
            tbody.innerHTML = ""

            getDocs(collection(db, "Users", "SUw3PRfA", "Private_Data"))
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        if (doc.data().Servicio == "Netflix") {
                            var tbody = document.querySelector('.tbody')
                            var tr = document.createElement('tr')
                            var nombre = document.createElement('th')
                            var correo = document.createElement('th')
                            var cuentaPadre = document.createElement('th')
                            var fecha = document.createElement('th')
                            var th_servicio = document.createElement('th')
                            var div_servicio = document.createElement('div')
                            var img_servicio = document.createElement('img')
                            var th_estado = document.createElement('th')
                            var estado = document.createElement('p')

                            nombre.textContent = doc.data().Nombre
                            correo.textContent = doc.data().Correo
                            cuentaPadre.textContent = doc.data().Correo_Padre
                            fecha.textContent = doc.data().Fecha
                            img_servicio.src = "/assets/logo_netflix.png"
                            estado.textContent = doc.data().Estado

                            div_servicio.className = "servicio"
                            estado.className = doc.data().Estado.toLowerCase()
                            estado.style.cursor = "auto"


                            tbody.appendChild(tr)
                            tr.appendChild(nombre)
                            tr.appendChild(correo)
                            tr.appendChild(cuentaPadre)
                            tr.appendChild(fecha)
                            tr.appendChild(th_servicio)
                            tr.appendChild(th_estado)
                            th_servicio.appendChild(div_servicio)
                            div_servicio.appendChild(img_servicio)
                            th_estado.appendChild(estado)
                        }

                        let servicios = doc.data().Servicio.split(", ")

                        if (servicios.length > 1) {
                            for (var i = 0; i < servicios.length; i++) {
                                if (servicios[i] == "Netflix") {
                                    var tbody = document.querySelector('.tbody')
                                    var tr = document.createElement('tr')
                                    var nombre = document.createElement('th')
                                    var correo = document.createElement('th')
                                    var cuentaPadre = document.createElement('th')
                                    var fecha = document.createElement('th')
                                    var th_servicio = document.createElement('th')
                                    var div_servicio = document.createElement('div')
                                    var img_servicio = document.createElement('img')
                                    var th_estado = document.createElement('th')
                                    var estado = document.createElement('p')

                                    nombre.textContent = doc.data().Nombre
                                    correo.textContent = doc.data().Correo
                                    cuentaPadre.textContent = doc.data().Correo_Padre
                                    fecha.textContent = doc.data().Fecha
                                    img_servicio.src = "/assets/logo_netflix.png"
                                    estado.textContent = doc.data().Estado

                                    div_servicio.className = "servicio"
                                    estado.className = doc.data().Estado.toLowerCase()
                                    estado.style.cursor = "auto"


                                    tbody.appendChild(tr)
                                    tr.appendChild(nombre)
                                    tr.appendChild(correo)
                                    tr.appendChild(cuentaPadre)
                                    tr.appendChild(fecha)
                                    tr.appendChild(th_servicio)
                                    tr.appendChild(th_estado)
                                    th_servicio.appendChild(div_servicio)
                                    div_servicio.appendChild(img_servicio)
                                    th_estado.appendChild(estado)
                                }
                            }
                        }

                    })
                })
        });

        paramount.addEventListener("click", () => {
            var tbody = document.querySelector('.tbody')
            tbody.innerHTML = ""

            getDocs(collection(db, "Users", "SUw3PRfA", "Private_Data"))
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        if (doc.data().Servicio == "Paramount+") {
                            var tbody = document.querySelector('.tbody')
                            var tr = document.createElement('tr')
                            var nombre = document.createElement('th')
                            var correo = document.createElement('th')
                            var cuentaPadre = document.createElement('th')
                            var fecha = document.createElement('th')
                            var th_servicio = document.createElement('th')
                            var div_servicio = document.createElement('div')
                            var img_servicio = document.createElement('img')
                            var th_estado = document.createElement('th')
                            var estado = document.createElement('p')

                            nombre.textContent = doc.data().Nombre
                            correo.textContent = doc.data().Correo
                            cuentaPadre.textContent = doc.data().Correo_Padre
                            fecha.textContent = doc.data().Fecha
                            img_servicio.src = "/assets/logo_paramount.png"
                            estado.textContent = doc.data().Estado

                            div_servicio.className = "servicio"
                            estado.className = doc.data().Estado.toLowerCase()
                            estado.style.cursor = "auto"


                            tbody.appendChild(tr)
                            tr.appendChild(nombre)
                            tr.appendChild(correo)
                            tr.appendChild(cuentaPadre)
                            tr.appendChild(fecha)
                            tr.appendChild(th_servicio)
                            tr.appendChild(th_estado)
                            th_servicio.appendChild(div_servicio)
                            div_servicio.appendChild(img_servicio)
                            th_estado.appendChild(estado)
                        }

                        let servicios = doc.data().Servicio.split(", ")

                        if (servicios.length > 1) {
                            for (var i = 0; i < servicios.length; i++) {
                                if (servicios[i] == "Paramount+") {
                                    var tbody = document.querySelector('.tbody')
                                    var tr = document.createElement('tr')
                                    var nombre = document.createElement('th')
                                    var correo = document.createElement('th')
                                    var cuentaPadre = document.createElement('th')
                                    var fecha = document.createElement('th')
                                    var th_servicio = document.createElement('th')
                                    var div_servicio = document.createElement('div')
                                    var img_servicio = document.createElement('img')
                                    var th_estado = document.createElement('th')
                                    var estado = document.createElement('p')

                                    nombre.textContent = doc.data().Nombre
                                    correo.textContent = doc.data().Correo
                                    cuentaPadre.textContent = doc.data().Correo_Padre
                                    fecha.textContent = doc.data().Fecha
                                    img_servicio.src = "/assets/logo_paramount.png"
                                    estado.textContent = doc.data().Estado

                                    div_servicio.className = "servicio"
                                    estado.className = doc.data().Estado.toLowerCase()
                                    estado.style.cursor = "auto"


                                    tbody.appendChild(tr)
                                    tr.appendChild(nombre)
                                    tr.appendChild(correo)
                                    tr.appendChild(cuentaPadre)
                                    tr.appendChild(fecha)
                                    tr.appendChild(th_servicio)
                                    tr.appendChild(th_estado)
                                    th_servicio.appendChild(div_servicio)
                                    div_servicio.appendChild(img_servicio)
                                    th_estado.appendChild(estado)
                                }
                            }
                        }

                    })
                })
        });

        prime.addEventListener("click", () => {
            var tbody = document.querySelector('.tbody')
            tbody.innerHTML = ""

            getDocs(collection(db, "Users", "SUw3PRfA", "Private_Data"))
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        if (doc.data().Servicio == "Prime Video") {
                            var tbody = document.querySelector('.tbody')
                            var tr = document.createElement('tr')
                            var nombre = document.createElement('th')
                            var correo = document.createElement('th')
                            var cuentaPadre = document.createElement('th')
                            var fecha = document.createElement('th')
                            var th_servicio = document.createElement('th')
                            var div_servicio = document.createElement('div')
                            var img_servicio = document.createElement('img')
                            var th_estado = document.createElement('th')
                            var estado = document.createElement('p')

                            nombre.textContent = doc.data().Nombre
                            correo.textContent = doc.data().Correo
                            cuentaPadre.textContent = doc.data().Correo_Padre
                            fecha.textContent = doc.data().Fecha
                            img_servicio.src = "/assets/logo_prime.png"
                            estado.textContent = doc.data().Estado

                            div_servicio.className = "servicio"
                            estado.className = doc.data().Estado.toLowerCase()
                            estado.style.cursor = "auto"


                            tbody.appendChild(tr)
                            tr.appendChild(nombre)
                            tr.appendChild(correo)
                            tr.appendChild(cuentaPadre)
                            tr.appendChild(fecha)
                            tr.appendChild(th_servicio)
                            tr.appendChild(th_estado)
                            th_servicio.appendChild(div_servicio)
                            div_servicio.appendChild(img_servicio)
                            th_estado.appendChild(estado)
                        }

                        let servicios = doc.data().Servicio.split(", ")

                        if (servicios.length > 1) {
                            for (var i = 0; i < servicios.length; i++) {
                                if (servicios[i] == "Prime Video") {
                                    var tbody = document.querySelector('.tbody')
                                    var tr = document.createElement('tr')
                                    var nombre = document.createElement('th')
                                    var correo = document.createElement('th')
                                    var cuentaPadre = document.createElement('th')
                                    var fecha = document.createElement('th')
                                    var th_servicio = document.createElement('th')
                                    var div_servicio = document.createElement('div')
                                    var img_servicio = document.createElement('img')
                                    var th_estado = document.createElement('th')
                                    var estado = document.createElement('p')

                                    nombre.textContent = doc.data().Nombre
                                    correo.textContent = doc.data().Correo
                                    cuentaPadre.textContent = doc.data().Correo_Padre
                                    fecha.textContent = doc.data().Fecha
                                    img_servicio.src = "/assets/logo_prime.png"
                                    estado.textContent = doc.data().Estado

                                    div_servicio.className = "servicio"
                                    estado.className = doc.data().Estado.toLowerCase()
                                    estado.style.cursor = "auto"


                                    tbody.appendChild(tr)
                                    tr.appendChild(nombre)
                                    tr.appendChild(correo)
                                    tr.appendChild(cuentaPadre)
                                    tr.appendChild(fecha)
                                    tr.appendChild(th_servicio)
                                    tr.appendChild(th_estado)
                                    th_servicio.appendChild(div_servicio)
                                    div_servicio.appendChild(img_servicio)
                                    th_estado.appendChild(estado)
                                }
                            }
                        }

                    })
                })
        });

        spotify.addEventListener("click", () => {
            var tbody = document.querySelector('.tbody')
            tbody.innerHTML = ""

            getDocs(collection(db, "Users", "SUw3PRfA", "Private_Data"))
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        if (doc.data().Servicio == "Spotify") {
                            var tbody = document.querySelector('.tbody')
                            var tr = document.createElement('tr')
                            var nombre = document.createElement('th')
                            var correo = document.createElement('th')
                            var cuentaPadre = document.createElement('th')
                            var fecha = document.createElement('th')
                            var th_servicio = document.createElement('th')
                            var div_servicio = document.createElement('div')
                            var img_servicio = document.createElement('img')
                            var th_estado = document.createElement('th')
                            var estado = document.createElement('p')

                            nombre.textContent = doc.data().Nombre
                            correo.textContent = doc.data().Correo
                            cuentaPadre.textContent = doc.data().Correo_Padre
                            fecha.textContent = doc.data().Fecha
                            img_servicio.src = "/assets/logo_spotify.jpg"
                            estado.textContent = doc.data().Estado

                            div_servicio.className = "servicio"
                            estado.className = doc.data().Estado.toLowerCase()
                            estado.style.cursor = "auto"


                            tbody.appendChild(tr)
                            tr.appendChild(nombre)
                            tr.appendChild(correo)
                            tr.appendChild(cuentaPadre)
                            tr.appendChild(fecha)
                            tr.appendChild(th_servicio)
                            tr.appendChild(th_estado)
                            th_servicio.appendChild(div_servicio)
                            div_servicio.appendChild(img_servicio)
                            th_estado.appendChild(estado)
                        }

                        let servicios = doc.data().Servicio.split(", ")

                        if (servicios.length > 1) {
                            for (var i = 0; i < servicios.length; i++) {
                                if (servicios[i] == "Spotify") {
                                    var tbody = document.querySelector('.tbody')
                                    var tr = document.createElement('tr')
                                    var nombre = document.createElement('th')
                                    var correo = document.createElement('th')
                                    var cuentaPadre = document.createElement('th')
                                    var fecha = document.createElement('th')
                                    var th_servicio = document.createElement('th')
                                    var div_servicio = document.createElement('div')
                                    var img_servicio = document.createElement('img')
                                    var th_estado = document.createElement('th')
                                    var estado = document.createElement('p')

                                    nombre.textContent = doc.data().Nombre
                                    correo.textContent = doc.data().Correo
                                    cuentaPadre.textContent = doc.data().Correo_Padre
                                    fecha.textContent = doc.data().Fecha
                                    img_servicio.src = "/assets/logo_spotify.jpg"
                                    estado.textContent = doc.data().Estado

                                    div_servicio.className = "servicio"
                                    estado.className = doc.data().Estado.toLowerCase()
                                    estado.style.cursor = "auto"


                                    tbody.appendChild(tr)
                                    tr.appendChild(nombre)
                                    tr.appendChild(correo)
                                    tr.appendChild(cuentaPadre)
                                    tr.appendChild(fecha)
                                    tr.appendChild(th_servicio)
                                    tr.appendChild(th_estado)
                                    th_servicio.appendChild(div_servicio)
                                    div_servicio.appendChild(img_servicio)
                                    th_estado.appendChild(estado)
                                }
                            }
                        }

                    })
                })
        });

        youtube.addEventListener("click", () => {
            var tbody = document.querySelector('.tbody')
            tbody.innerHTML = ""

            getDocs(collection(db, "Users", "SUw3PRfA", "Private_Data"))
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        if (doc.data().Servicio == "YouTube") {
                            var tbody = document.querySelector('.tbody')
                            var tr = document.createElement('tr')
                            var nombre = document.createElement('th')
                            var correo = document.createElement('th')
                            var cuentaPadre = document.createElement('th')
                            var fecha = document.createElement('th')
                            var th_servicio = document.createElement('th')
                            var div_servicio = document.createElement('div')
                            var img_servicio = document.createElement('img')
                            var th_estado = document.createElement('th')
                            var estado = document.createElement('p')

                            nombre.textContent = doc.data().Nombre
                            correo.textContent = doc.data().Correo
                            cuentaPadre.textContent = doc.data().Correo_Padre
                            fecha.textContent = doc.data().Fecha
                            img_servicio.src = "/assets/logo_youtube.png"
                            estado.textContent = doc.data().Estado

                            div_servicio.className = "servicio"
                            estado.className = doc.data().Estado.toLowerCase()
                            estado.style.cursor = "auto"


                            tbody.appendChild(tr)
                            tr.appendChild(nombre)
                            tr.appendChild(correo)
                            tr.appendChild(cuentaPadre)
                            tr.appendChild(fecha)
                            tr.appendChild(th_servicio)
                            tr.appendChild(th_estado)
                            th_servicio.appendChild(div_servicio)
                            div_servicio.appendChild(img_servicio)
                            th_estado.appendChild(estado)
                        }

                        let servicios = doc.data().Servicio.split(", ")

                        if (servicios.length > 1) {
                            for (var i = 0; i < servicios.length; i++) {
                                if (servicios[i] == "YouTube") {
                                    var tbody = document.querySelector('.tbody')
                                    var tr = document.createElement('tr')
                                    var nombre = document.createElement('th')
                                    var correo = document.createElement('th')
                                    var cuentaPadre = document.createElement('th')
                                    var fecha = document.createElement('th')
                                    var th_servicio = document.createElement('th')
                                    var div_servicio = document.createElement('div')
                                    var img_servicio = document.createElement('img')
                                    var th_estado = document.createElement('th')
                                    var estado = document.createElement('p')

                                    nombre.textContent = doc.data().Nombre
                                    correo.textContent = doc.data().Correo
                                    cuentaPadre.textContent = doc.data().Correo_Padre
                                    fecha.textContent = doc.data().Fecha
                                    img_servicio.src = "/assets/logo_youtube.png"
                                    estado.textContent = doc.data().Estado

                                    div_servicio.className = "servicio"
                                    estado.className = doc.data().Estado.toLowerCase()
                                    estado.style.cursor = "auto"


                                    tbody.appendChild(tr)
                                    tr.appendChild(nombre)
                                    tr.appendChild(correo)
                                    tr.appendChild(cuentaPadre)
                                    tr.appendChild(fecha)
                                    tr.appendChild(th_servicio)
                                    tr.appendChild(th_estado)
                                    th_servicio.appendChild(div_servicio)
                                    div_servicio.appendChild(img_servicio)
                                    th_estado.appendChild(estado)
                                }
                            }
                        }

                    })
                })
        });

        directv.addEventListener("click", () => {
            var tbody = document.querySelector('.tbody')
            tbody.innerHTML = ""

            getDocs(collection(db, "Users", "SUw3PRfA", "Private_Data"))
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        if (doc.data().Servicio == "DirecTV") {
                            var tbody = document.querySelector('.tbody')
                            var tr = document.createElement('tr')
                            var nombre = document.createElement('th')
                            var correo = document.createElement('th')
                            var cuentaPadre = document.createElement('th')
                            var fecha = document.createElement('th')
                            var th_servicio = document.createElement('th')
                            var div_servicio = document.createElement('div')
                            var img_servicio = document.createElement('img')
                            var th_estado = document.createElement('th')
                            var estado = document.createElement('p')

                            nombre.textContent = doc.data().Nombre
                            correo.textContent = doc.data().Correo
                            cuentaPadre.textContent = doc.data().Correo_Padre
                            fecha.textContent = doc.data().Fecha
                            img_servicio.src = "/assets/logo_directv.png"
                            estado.textContent = doc.data().Estado

                            div_servicio.className = "servicio"
                            estado.className = doc.data().Estado.toLowerCase()
                            estado.style.cursor = "auto"


                            tbody.appendChild(tr)
                            tr.appendChild(nombre)
                            tr.appendChild(correo)
                            tr.appendChild(cuentaPadre)
                            tr.appendChild(fecha)
                            tr.appendChild(th_servicio)
                            tr.appendChild(th_estado)
                            th_servicio.appendChild(div_servicio)
                            div_servicio.appendChild(img_servicio)
                            th_estado.appendChild(estado)
                        }

                        let servicios = doc.data().Servicio.split(", ")

                        if (servicios.length > 1) {
                            for (var i = 0; i < servicios.length; i++) {
                                if (servicios[i] == "DirecTV") {
                                    var tbody = document.querySelector('.tbody')
                                    var tr = document.createElement('tr')
                                    var nombre = document.createElement('th')
                                    var correo = document.createElement('th')
                                    var cuentaPadre = document.createElement('th')
                                    var fecha = document.createElement('th')
                                    var th_servicio = document.createElement('th')
                                    var div_servicio = document.createElement('div')
                                    var img_servicio = document.createElement('img')
                                    var th_estado = document.createElement('th')
                                    var estado = document.createElement('p')

                                    nombre.textContent = doc.data().Nombre
                                    correo.textContent = doc.data().Correo
                                    cuentaPadre.textContent = doc.data().Correo_Padre
                                    fecha.textContent = doc.data().Fecha
                                    img_servicio.src = "/assets/logo_directv.png"
                                    estado.textContent = doc.data().Estado

                                    div_servicio.className = "servicio"
                                    estado.className = doc.data().Estado.toLowerCase()
                                    estado.style.cursor = "auto"


                                    tbody.appendChild(tr)
                                    tr.appendChild(nombre)
                                    tr.appendChild(correo)
                                    tr.appendChild(cuentaPadre)
                                    tr.appendChild(fecha)
                                    tr.appendChild(th_servicio)
                                    tr.appendChild(th_estado)
                                    th_servicio.appendChild(div_servicio)
                                    div_servicio.appendChild(img_servicio)
                                    th_estado.appendChild(estado)
                                }
                            }
                        }

                    })
                })
        });

        disneypremium.addEventListener("click", () => {
            var tbody = document.querySelector('.tbody')
            tbody.innerHTML = ""

            getDocs(collection(db, "Users", "SUw3PRfA", "Private_Data"))
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        if (doc.data().Servicio == "Disney+ Premium") {
                            var tbody = document.querySelector('.tbody')
                            var tr = document.createElement('tr')
                            var nombre = document.createElement('th')
                            var correo = document.createElement('th')
                            var cuentaPadre = document.createElement('th')
                            var fecha = document.createElement('th')
                            var th_servicio = document.createElement('th')
                            var div_servicio = document.createElement('div')
                            var img_servicio = document.createElement('img')
                            var th_estado = document.createElement('th')
                            var estado = document.createElement('p')

                            nombre.textContent = doc.data().Nombre
                            correo.textContent = doc.data().Correo
                            cuentaPadre.textContent = doc.data().Correo_Padre
                            fecha.textContent = doc.data().Fecha
                            img_servicio.src = "/assets/logo_disneypremium.png"
                            estado.textContent = doc.data().Estado

                            div_servicio.className = "servicio"
                            estado.className = doc.data().Estado.toLowerCase()
                            estado.style.cursor = "auto"


                            tbody.appendChild(tr)
                            tr.appendChild(nombre)
                            tr.appendChild(correo)
                            tr.appendChild(cuentaPadre)
                            tr.appendChild(fecha)
                            tr.appendChild(th_servicio)
                            tr.appendChild(th_estado)
                            th_servicio.appendChild(div_servicio)
                            div_servicio.appendChild(img_servicio)
                            th_estado.appendChild(estado)
                        }

                        let servicios = doc.data().Servicio.split(", ")

                        if (servicios.length > 1) {
                            for (var i = 0; i < servicios.length; i++) {
                                if (servicios[i] == "Disney+ Premium") {
                                    var tbody = document.querySelector('.tbody')
                                    var tr = document.createElement('tr')
                                    var nombre = document.createElement('th')
                                    var correo = document.createElement('th')
                                    var cuentaPadre = document.createElement('th')
                                    var fecha = document.createElement('th')
                                    var th_servicio = document.createElement('th')
                                    var div_servicio = document.createElement('div')
                                    var img_servicio = document.createElement('img')
                                    var th_estado = document.createElement('th')
                                    var estado = document.createElement('p')

                                    nombre.textContent = doc.data().Nombre
                                    correo.textContent = doc.data().Correo
                                    cuentaPadre.textContent = doc.data().Correo_Padre
                                    fecha.textContent = doc.data().Fecha
                                    img_servicio.src = "/assets/logo_disneypremium.png"
                                    estado.textContent = doc.data().Estado

                                    div_servicio.className = "servicio"
                                    estado.className = doc.data().Estado.toLowerCase()
                                    estado.style.cursor = "auto"


                                    tbody.appendChild(tr)
                                    tr.appendChild(nombre)
                                    tr.appendChild(correo)
                                    tr.appendChild(cuentaPadre)
                                    tr.appendChild(fecha)
                                    tr.appendChild(th_servicio)
                                    tr.appendChild(th_estado)
                                    th_servicio.appendChild(div_servicio)
                                    div_servicio.appendChild(img_servicio)
                                    th_estado.appendChild(estado)
                                }
                            }
                        }

                    })
                })
        });

        crunchyroll.addEventListener("click", () => {
            var tbody = document.querySelector('.tbody')
            tbody.innerHTML = ""

            getDocs(collection(db, "Users", "SUw3PRfA", "Private_Data"))
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        if (doc.data().Servicio == "Crunchyroll") {
                            var tbody = document.querySelector('.tbody')
                            var tr = document.createElement('tr')
                            var nombre = document.createElement('th')
                            var correo = document.createElement('th')
                            var cuentaPadre = document.createElement('th')
                            var fecha = document.createElement('th')
                            var th_servicio = document.createElement('th')
                            var div_servicio = document.createElement('div')
                            var img_servicio = document.createElement('img')
                            var th_estado = document.createElement('th')
                            var estado = document.createElement('p')

                            nombre.textContent = doc.data().Nombre
                            correo.textContent = doc.data().Correo
                            cuentaPadre.textContent = doc.data().Correo_Padre
                            fecha.textContent = doc.data().Fecha
                            img_servicio.src = "/assets/logo_crunchyroll.png"
                            estado.textContent = doc.data().Estado

                            div_servicio.className = "servicio"
                            estado.className = doc.data().Estado.toLowerCase()
                            estado.style.cursor = "auto"


                            tbody.appendChild(tr)
                            tr.appendChild(nombre)
                            tr.appendChild(correo)
                            tr.appendChild(cuentaPadre)
                            tr.appendChild(fecha)
                            tr.appendChild(th_servicio)
                            tr.appendChild(th_estado)
                            th_servicio.appendChild(div_servicio)
                            div_servicio.appendChild(img_servicio)
                            th_estado.appendChild(estado)
                        }

                        let servicios = doc.data().Servicio.split(", ")

                        if (servicios.length > 1) {
                            for (var i = 0; i < servicios.length; i++) {
                                if (servicios[i] == "Crunchyroll") {
                                    var tbody = document.querySelector('.tbody')
                                    var tr = document.createElement('tr')
                                    var nombre = document.createElement('th')
                                    var correo = document.createElement('th')
                                    var cuentaPadre = document.createElement('th')
                                    var fecha = document.createElement('th')
                                    var th_servicio = document.createElement('th')
                                    var div_servicio = document.createElement('div')
                                    var img_servicio = document.createElement('img')
                                    var th_estado = document.createElement('th')
                                    var estado = document.createElement('p')

                                    nombre.textContent = doc.data().Nombre
                                    correo.textContent = doc.data().Correo
                                    cuentaPadre.textContent = doc.data().Correo_Padre
                                    fecha.textContent = doc.data().Fecha
                                    img_servicio.src = "/assets/logo_crunchyroll.png"
                                    estado.textContent = doc.data().Estado

                                    div_servicio.className = "servicio"
                                    estado.className = doc.data().Estado.toLowerCase()
                                    estado.style.cursor = "auto"


                                    tbody.appendChild(tr)
                                    tr.appendChild(nombre)
                                    tr.appendChild(correo)
                                    tr.appendChild(cuentaPadre)
                                    tr.appendChild(fecha)
                                    tr.appendChild(th_servicio)
                                    tr.appendChild(th_estado)
                                    th_servicio.appendChild(div_servicio)
                                    div_servicio.appendChild(img_servicio)
                                    th_estado.appendChild(estado)
                                }
                            }
                        }

                    })
                })
        });

        vix.addEventListener("click", () => {
            var tbody = document.querySelector('.tbody')
            tbody.innerHTML = ""

            getDocs(collection(db, "Users", "SUw3PRfA", "Private_Data"))
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        if (doc.data().Servicio == "Vix") {
                            var tbody = document.querySelector('.tbody')
                            var tr = document.createElement('tr')
                            var nombre = document.createElement('th')
                            var correo = document.createElement('th')
                            var cuentaPadre = document.createElement('th')
                            var fecha = document.createElement('th')
                            var th_servicio = document.createElement('th')
                            var div_servicio = document.createElement('div')
                            var img_servicio = document.createElement('img')
                            var th_estado = document.createElement('th')
                            var estado = document.createElement('p')

                            nombre.textContent = doc.data().Nombre
                            correo.textContent = doc.data().Correo
                            cuentaPadre.textContent = doc.data().Correo_Padre
                            fecha.textContent = doc.data().Fecha
                            img_servicio.src = "/assets/logo_vix.jpg"
                            estado.textContent = doc.data().Estado

                            div_servicio.className = "servicio"
                            estado.className = doc.data().Estado.toLowerCase()
                            estado.style.cursor = "auto"


                            tbody.appendChild(tr)
                            tr.appendChild(nombre)
                            tr.appendChild(correo)
                            tr.appendChild(cuentaPadre)
                            tr.appendChild(fecha)
                            tr.appendChild(th_servicio)
                            tr.appendChild(th_estado)
                            th_servicio.appendChild(div_servicio)
                            div_servicio.appendChild(img_servicio)
                            th_estado.appendChild(estado)
                        }

                        let servicios = doc.data().Servicio.split(", ")

                        if (servicios.length > 1) {
                            for (var i = 0; i < servicios.length; i++) {
                                if (servicios[i] == "Vix") {
                                    var tbody = document.querySelector('.tbody')
                                    var tr = document.createElement('tr')
                                    var nombre = document.createElement('th')
                                    var correo = document.createElement('th')
                                    var cuentaPadre = document.createElement('th')
                                    var fecha = document.createElement('th')
                                    var th_servicio = document.createElement('th')
                                    var div_servicio = document.createElement('div')
                                    var img_servicio = document.createElement('img')
                                    var th_estado = document.createElement('th')
                                    var estado = document.createElement('p')

                                    nombre.textContent = doc.data().Nombre
                                    correo.textContent = doc.data().Correo
                                    cuentaPadre.textContent = doc.data().Correo_Padre
                                    fecha.textContent = doc.data().Fecha
                                    img_servicio.src = "/assets/logo_vix.jpg"
                                    estado.textContent = doc.data().Estado

                                    div_servicio.className = "servicio"
                                    estado.className = doc.data().Estado.toLowerCase()
                                    estado.style.cursor = "auto"


                                    tbody.appendChild(tr)
                                    tr.appendChild(nombre)
                                    tr.appendChild(correo)
                                    tr.appendChild(cuentaPadre)
                                    tr.appendChild(fecha)
                                    tr.appendChild(th_servicio)
                                    tr.appendChild(th_estado)
                                    th_servicio.appendChild(div_servicio)
                                    div_servicio.appendChild(img_servicio)
                                    th_estado.appendChild(estado)
                                }
                            }
                        }

                    })
                })
        });

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
            img_service.src = '/assets/fondoNetflix.png'

            var tbody = document.querySelector('.tbody')
            tbody.innerHTML = ""

            getDocs(collection(db, "Users", "SUw3PRfA", "Private_Data"))
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

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


                        p_estado.textContent = doc.data().Estado
                        p_estado.className = doc.data().Estado.toLowerCase()


                        tbody.appendChild(tr)
                        tr.appendChild(nombre)
                        tr.appendChild(correo)
                        tr.appendChild(cuenta_padre)
                        tr.appendChild(number)
                        tr.appendChild(servicio)
                        tr.appendChild(estado)
                        servicio.appendChild(cont_servicio)
                        estado.appendChild(p_estado)

                        // Change estado

                        var btnEstado2 = document.querySelector('#estado')
                        var changeEstado = document.querySelector('.change_estado')
                        var close_changeEstado = document.querySelector('.content_change-estado i')

                        var estadoActivo = document.querySelector('.p_change-estado #activo')
                        var estadoInactivo = document.querySelector('.p_change-estado #inactivo')
                        var estadoDanado = document.querySelector('.p_change-estado #danado')
                        var estadoDisponible = document.querySelector('.p_change-estado #disponible')
                        var estadoReserva = document.querySelector('.p_change-estado #reserva')

                        p_estado.addEventListener('click', () => {
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
                    })
                })

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

        // Mostrar Users

        var tbody = document.querySelector('.tbody')
        tbody.innerHTML = ""

        getDocs(collection(db, "Users", "SUw3PRfA", "Private_Data"))
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

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


                    p_estado.textContent = doc.data().Estado
                    p_estado.className = doc.data().Estado.toLowerCase()


                    tbody.appendChild(tr)
                    tr.appendChild(nombre)
                    tr.appendChild(correo)
                    tr.appendChild(cuenta_padre)
                    tr.appendChild(number)
                    tr.appendChild(servicio)
                    tr.appendChild(estado)
                    servicio.appendChild(cont_servicio)
                    estado.appendChild(p_estado)

                    // Change estado

                    var btnEstado2 = document.querySelector('#estado')
                    var changeEstado = document.querySelector('.change_estado')
                    var close_changeEstado = document.querySelector('.content_change-estado i')

                    var estadoActivo = document.querySelector('.p_change-estado #activo')
                    var estadoInactivo = document.querySelector('.p_change-estado #inactivo')
                    var estadoDanado = document.querySelector('.p_change-estado #danado')
                    var estadoDisponible = document.querySelector('.p_change-estado #disponible')
                    var estadoReserva = document.querySelector('.p_change-estado #reserva')

                    p_estado.addEventListener('click', () => {
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
                })
            })

    } else {
        var out = document.querySelector('.out')

        out.classList.add('active')
    }
});

