var login = document.querySelector(".login")
var user = document.querySelector(".user")
var contra = document.querySelector(".contra")

login.addEventListener("click", () =>  {

    

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

// remember

var btnUps = document.querySelector(".ups")
var container_ups = document.querySelector(".container_ups")

btnUps.addEventListener("click", () => {
    container_ups.classList.toggle("active")

    window.addEventListener('click', event => {
        if (event.target == container_ups) {
            container_ups.classList.remove('active')
        }
    })
})





