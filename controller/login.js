var login = document.querySelector(".login")
var user = document.querySelector(".user")
var contra = document.querySelector(".contra")

let usersi = "pepito123"
let contrasi = "123456"

login.addEventListener("click", () =>  {
    if (user.value == usersi && contra.value == contrasi) {
        location.href = "/views/inside.html"
    }else{
        alert("Usuario o contraseña incorrectos")
        location.reload()
    }
})

// eye

var eye = document.querySelector("#eye")

eye.addEventListener('click', () => {
    eye.classList.toggle('active')

    if (contra.type == "password") {
        contra.type = "text"
    } else if (contra.type == "text") {
        contra.type = "password"
    }
})



