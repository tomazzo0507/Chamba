// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, where } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
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

        // service

        var btnService = document.querySelector('.servicio')
        var service = document.querySelector('.select_service')

        var disney = document.querySelector('.disney');
        var apple = document.querySelector('.apple');
        var hbo = document.querySelector('.hbo');
        var netflix = document.querySelector('.netflix');
        var paramount = document.querySelector('.paramount');
        var prime = document.querySelector('.prime');
        var crunchyroll = document.querySelector('.crunchyroll');
        var directv = document.querySelector('.directv');
        var disneypremium = document.querySelector('.disneypremium');
        var spotify = document.querySelector('.spotify');
        var vix = document.querySelector('.vix');
        var youtube = document.querySelector('.youtube');


        btnService.addEventListener('click', () => {
            service.classList.toggle('active')

            btnService.disabled = true

            window.addEventListener('click', event => {
                if (event.target == service) {
                    service.classList.remove('active')
                    btnService.disabled = false
                }
            })
        })

        disney.addEventListener('click', () => {
            service.classList.remove('active');
            btnService.disabled = false;
            if (btnService.value.length != 0) {
                btnService.value += ", Disney+";
            } else {
                btnService.value = "Disney+";
            }
            disney.style.display = 'none';
        });

        apple.addEventListener('click', () => {
            service.classList.remove('active');
            btnService.disabled = false;
            if (btnService.value.length != 0) {
                btnService.value += ", Apple TV";
            } else {
                btnService.value = "Apple TV";
            }
            apple.style.display = 'none';
        });

        hbo.addEventListener('click', () => {
            service.classList.remove('active');
            btnService.disabled = false;
            if (btnService.value.length != 0) {
                btnService.value += ", HBO";
            } else {
                btnService.value = "HBO";
            }
            hbo.style.display = 'none';
        });

        netflix.addEventListener('click', () => {
            service.classList.remove('active');
            btnService.disabled = false;
            if (btnService.value.length != 0) {
                btnService.value += ", Netflix";
            } else {
                btnService.value = "Netflix";
            }
            netflix.style.display = 'none';
        });

        paramount.addEventListener('click', () => {
            service.classList.remove('active');
            btnService.disabled = false;
            if (btnService.value.length != 0) {
                btnService.value += ", Paramount+";
            } else {
                btnService.value = "Paramount+";
            }
            paramount.style.display = 'none';
        });

        prime.addEventListener('click', () => {
            service.classList.remove('active');
            btnService.disabled = false;
            if (btnService.value.length != 0) {
                btnService.value += ", Prime Video";
            } else {
                btnService.value = "Prime Video";
            }
            prime.style.display = 'none';
        });

        crunchyroll.addEventListener('click', () => {
            service.classList.remove('active');
            btnService.disabled = false;
            if (btnService.value.length != 0) {
                btnService.value += ", Crunchyroll";
            } else {
                btnService.value = "Crunchyroll";
            }
            crunchyroll.style.display = 'none';
        });

        directv.addEventListener('click', () => {
            service.classList.remove('active');
            btnService.disabled = false;
            if (btnService.value.length != 0) {
                btnService.value += ", DirecTV";
            } else {
                btnService.value = "DirecTV";
            }
            directv.style.display = 'none';
        });

        disneypremium.addEventListener('click', () => {
            service.classList.remove('active');
            btnService.disabled = false;
            if (btnService.value.length != 0) {
                btnService.value += ", Disney+ Premium";
            } else {
                btnService.value = "Disney+ Premium";
            }
            disneypremium.style.display = 'none';
        });

        spotify.addEventListener('click', () => {
            service.classList.remove('active');
            btnService.disabled = false;
            if (btnService.value.length != 0) {
                btnService.value += ", Spotify";
            } else {
                btnService.value = "Spotify";
            }
            spotify.style.display = 'none';
        });

        vix.addEventListener('click', () => {
            service.classList.remove('active');
            btnService.disabled = false;
            if (btnService.value.length != 0) {
                btnService.value += ", Vix";
            } else {
                btnService.value = "Vix";
            }
            vix.style.display = 'none';
        });

        youtube.addEventListener('click', () => {
            service.classList.remove('active');
            btnService.disabled = false;
            if (btnService.value.length != 0) {
                btnService.value += ", YouTube";
            } else {
                btnService.value = "YouTube";
            }
            youtube.style.display = 'none';
        });

        // clean_service

        var clean_service = document.querySelector('#clean_service')

        clean_service.addEventListener('click', () => {
            btnService.value = "";

            disney.style.display = '';
            apple.style.display = '';
            hbo.style.display = '';
            netflix.style.display = '';
            paramount.style.display = '';
            prime.style.display = '';
            crunchyroll.style.display = '';
            directv.style.display = '';
            disneypremium.style.display = '';
            spotify.style.display = '';
            vix.style.display = '';
            youtube.style.display = '';
        })

        // select_pais

        var btnPais = document.querySelector('.pais')
        var pais = document.querySelector('.select_pais')

        btnPais.addEventListener('focus', (event) => {
            if (/Mobi|Android/i.test(navigator.userAgent)) {
                event.preventDefault();
            }
        });

        var colombia = document.querySelector('.colombia');
        var argentina = document.querySelector('.argentina');
        var peru = document.querySelector('.peru');
        var brasil = document.querySelector('.brasil');
        var espana = document.querySelector('.espana');
        var usa = document.querySelector('.usa');

        btnPais.addEventListener('click', () => {
            pais.classList.toggle('active')

            btnPais.disabled = true
            btnPais.value = ""

            window.addEventListener('click', event => {
                if (event.target == pais) {
                    pais.classList.remove('active')
                    btnPais.disabled = false
                }
            })
        })

        colombia.addEventListener('click', () => {
            pais.classList.remove('active');
            btnPais.value = "Colombia";
            btnPais.disabled = false;
        });

        argentina.addEventListener('click', () => {
            pais.classList.remove('active');
            btnPais.value = "Argentina";
            btnPais.disabled = false;
        });

        peru.addEventListener('click', () => {
            pais.classList.remove('active');
            btnPais.value = "Perú";
            btnPais.disabled = false;
        });

        brasil.addEventListener('click', () => {
            pais.classList.remove('active');
            btnPais.value = "Brasil";
            btnPais.disabled = false;
        });

        espana.addEventListener('click', () => {
            pais.classList.remove('active');
            btnPais.value = "España";
            btnPais.disabled = false;
        });

        usa.addEventListener('click', () => {
            pais.classList.remove('active');
            btnPais.value = "USA";
            btnPais.disabled = false;
        });


    } else {
        var out = document.querySelector('.out')

        out.classList.add('active')
    }
});
