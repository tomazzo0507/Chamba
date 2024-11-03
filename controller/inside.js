var btn = document.querySelector("#btn")
var sidebar = document.querySelector(".sidebar")

sidebar.classList.add("small");

btn.addEventListener("click", () => {
    sidebar.classList.toggle("small");
})