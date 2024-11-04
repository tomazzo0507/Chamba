var btn = document.querySelector("#btn")
var sidebar = document.querySelector(".sidebar")

var close = document.querySelector('#close')
var x = document.querySelector('#x')

sidebar.classList.add("small");

btn.addEventListener("click", () => {
    sidebar.classList.toggle("small");
    filtro.classList.remove('active')
    btnFilter.classList.remove('active')
})

close.addEventListener('click', () => {
    sidebar.classList.add("active");
    btnFilter.classList.remove('active')
    filtro.classList.remove('active')
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
    filtro.classList.toggle('active')
    btnFilter.classList.toggle('active')
})

close_filtro.addEventListener('click', () => {
    filtro.classList.remove('active')
    btnFilter.classList.remove('active')
})