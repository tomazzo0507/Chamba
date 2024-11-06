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

// Dark Mode

const body = document.body
const checkbox = document.querySelector('.theme-switch__checkbox')
const palanca = document.querySelector('.theme-switch__checkbox')

palanca.addEventListener('click', () => {
    body.classList.toggle('dark-mode')
})

// out

var out = document.querySelector('#out')

out.addEventListener("click", () => {
    location.href = "/index.html"
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
});

apple.addEventListener("click", () => {
    service.style.display = "none";
    table.style.display = "";
});

hbo.addEventListener("click", () => {
    service.style.display = "none";
    table.style.display = "";
});

netflix.addEventListener("click", () => {
    service.style.display = "none";
    table.style.display = "";
});

paramount.addEventListener("click", () => {
    service.style.display = "none";
    table.style.display = "";
});

prime.addEventListener("click", () => {
    service.style.display = "none";
    table.style.display = "";
});

spotify.addEventListener("click", () => {
    service.style.display = "none";
    table.style.display = "";
});

youtube.addEventListener("click", () => {
    service.style.display = "none";
    table.style.display = "";
});

directv.addEventListener("click", () => {
    service.style.display = "none";
    table.style.display = "";
});

disney_prem.addEventListener("click", () => {
    service.style.display = "none";
    table.style.display = "";
});

crunchyroll.addEventListener("click", () => {
    service.style.display = "none";
    table.style.display = "";
});

vix.addEventListener("click", () => {
    service.style.display = "none";
    table.style.display = "";
});

// back window 1

var back = document.querySelector(".back")

back.addEventListener("click", () => {
    service.style.display = "";
    table.style.display = "none";
})



