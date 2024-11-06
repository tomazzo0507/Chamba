var eye = document.querySelector("#eye")

eye.addEventListener('click', () => {
    eye.classList.toggle('active')

    if (contra.type == "password") {
        contra.type = "text"
    } else if (contra.type == "text") {
        contra.type = "password"
    }
})
