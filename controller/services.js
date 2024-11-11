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

        // window 1

        var table = document.querySelector(".default")

        table.style.display = "none"

        // window 2

        var service = document.querySelector(".services")

        var disney = document.querySelector(".disney");
        var apple = document.querySelector(".apple");
        var hbo = document.querySelector(".hbo");
        var netflix = document.querySelector(".netflix");
        var paramount = document.querySelector(".paramount");
        var prime = document.querySelector(".prime");
        var spotify = document.querySelector(".spotify");
        var youtube = document.querySelector(".youtube");
        var directv = document.querySelector(".directv");
        var disney_prem = document.querySelector(".disney_prem");
        var crunchyroll = document.querySelector(".crunchyroll");
        var vix = document.querySelector(".vix");

        disney.addEventListener("click", () => {
            service.style.display = "none";
            table.style.display = "";

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
            service.style.display = "none";
            table.style.display = "";

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
            service.style.display = "none";
            table.style.display = "";

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
            service.style.display = "none";
            table.style.display = "";

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
            service.style.display = "none";
            table.style.display = "";

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
            service.style.display = "none";
            table.style.display = "";

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
            service.style.display = "none";
            table.style.display = "";

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
            service.style.display = "none";
            table.style.display = "";

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
            service.style.display = "none";
            table.style.display = "";

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

        disney_prem.addEventListener("click", () => {
            service.style.display = "none";
            table.style.display = "";

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
            service.style.display = "none";
            table.style.display = "";

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
            service.style.display = "none";
            table.style.display = "";

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

        // back window 1

        var back = document.querySelector(".back")

        back.addEventListener("click", () => {
            service.style.display = "";
            table.style.display = "none";
        })

    } else {
        var out = document.querySelector('.out')
        out.classList.add('active')
    }
});

