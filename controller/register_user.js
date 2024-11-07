// service

var btnService = document.querySelector('.servicio')
var service = document.querySelector('.select_service')

btnService.addEventListener('focus', (event) => {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        event.preventDefault();
    }
});

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
});

apple.addEventListener('click', () => {
    service.classList.remove('active');
    btnService.disabled = false;
    if (btnService.value.length != 0) {
        btnService.value += ", Apple TV";
    } else {
        btnService.value = "Apple TV";
    }
});

hbo.addEventListener('click', () => {
    service.classList.remove('active');
    btnService.disabled = false;
    if (btnService.value.length != 0) {
        btnService.value += ", HBO";
    } else {
        btnService.value = "HBO";
    }
});

netflix.addEventListener('click', () => {
    service.classList.remove('active');
    btnService.disabled = false;
    if (btnService.value.length != 0) {
        btnService.value += ", Netflix";
    } else {
        btnService.value = "Netflix";
    }
});

paramount.addEventListener('click', () => {
    service.classList.remove('active');
    btnService.disabled = false;
    if (btnService.value.length != 0) {
        btnService.value += ", Paramount+";
    } else {
        btnService.value = "Paramount+";
    }
});

prime.addEventListener('click', () => {
    service.classList.remove('active');
    btnService.disabled = false;
    if (btnService.value.length != 0) {
        btnService.value += ", Prime Video";
    } else {
        btnService.value = "Prime Video";
    }
});

crunchyroll.addEventListener('click', () => {
    service.classList.remove('active');
    btnService.disabled = false;
    if (btnService.value.length != 0) {
        btnService.value += ", Crunchyroll";
    } else {
        btnService.value = "Crunchyroll";
    }
});

directv.addEventListener('click', () => {
    service.classList.remove('active');
    btnService.disabled = false;
    if (btnService.value.length != 0) {
        btnService.value += ", DirecTV";
    } else {
        btnService.value = "DirecTV";
    }
});

disneypremium.addEventListener('click', () => {
    service.classList.remove('active');
    btnService.disabled = false;
    if (btnService.value.length != 0) {
        btnService.value += ", Disney+ Premium";
    } else {
        btnService.value = "Disney + Premium";
    }
});

spotify.addEventListener('click', () => {
    service.classList.remove('active');
    btnService.disabled = false;
    if (btnService.value.length != 0) {
        btnService.value += ", Spotify";
    } else {
        btnService.value = "Spotify";
    }
});

vix.addEventListener('click', () => {
    service.classList.remove('active');
    btnService.disabled = false;
    if (btnService.value.length != 0) {
        btnService.value += ", Vix";
    } else {
        btnService.value = "Vix";
    }
});

youtube.addEventListener('click', () => {
    service.classList.remove('active');
    btnService.disabled = false;
    if (btnService.value.length != 0) {
        btnService.value += ", YouTube";
    } else {
        btnService.value = "YouTube";
    }
});

// clean_service

var clean_service = document.querySelector('#clean_service')

clean_service.addEventListener('click', () => {
    btnService.value = "";
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
