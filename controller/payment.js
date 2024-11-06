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

const body = document.body
const checkbox = document.querySelector('.theme-switch__checkbox')
const palanca = document.querySelector('.theme-switch__checkbox')

palanca.addEventListener('click', () => {
    body.classList.toggle('dark-mode')
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

// out

var out = document.querySelector('#out')

out.addEventListener("click", () => {
    location.href = "/index.html"
})
