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

out.addEventListener("click", () => {
    location.href = "/index.html"
})

// pay

var payAll = document.querySelector('#payAll')

payAll.addEventListener('click', () => {
    window.open("/views/register.html", "_blank");
})