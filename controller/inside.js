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

const body = document.body
const checkbox = document.querySelector('.theme-switch__checkbox')
const palanca = document.querySelector('.theme-switch__checkbox')

palanca.addEventListener('click', () => {
    body.classList.toggle('dark-mode')
})

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

btnService.addEventListener("click", () => {
    location.href = "/views/services.html"
})

btnInicio.addEventListener("click", () => {
    location.href = "/views/inside.html"
})

btnCobros.addEventListener("click", () => {
    location.href = "/views/payment.html"
})

var service = document.querySelector('.select_service')
var btnService = document.querySelector('#open_service')

var disney = document.querySelector('.disney')
var apple = document.querySelector('.apple')
var hbo = document.querySelector('.hbo')
var netflix = document.querySelector('.netflix')
var paramount = document.querySelector('.paramount')
var prime = document.querySelector('.prime')

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

out.addEventListener("click", () => {
    location.href = "/index.html"
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