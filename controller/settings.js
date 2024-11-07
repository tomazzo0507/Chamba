var btnInfo = document.querySelector(".top_content");
var contInfo = document.querySelector(".container_change-info");
var changeInfo = document.querySelector(".change_info");

btnInfo.addEventListener("click", () => {
    contInfo.classList.add("visible");
});

contInfo.addEventListener("click", (event) => {
    if (!changeInfo.contains(event.target)) {
        contInfo.classList.remove("visible");
    }
});

var btnContra = document.querySelector(".bottom_content");
var contContra = document.querySelector(".container_change-contra");
var changeContra = document.querySelector(".change_contra");

btnContra.addEventListener("click", () => {
    contContra.classList.add("visible");
});

contContra.addEventListener("click", (event) => {
    if (!changeContra.contains(event.target)) {
        contContra.classList.remove("visible");
    }
});