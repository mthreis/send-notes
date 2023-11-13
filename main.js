
function getNight() {
    

    const night = localStorage.getItem("night");

    console.log("night", night);


}

var checkbox = document.getElementById("night");

console.log("NIGHT> ", localStorage.getItem("night"));

checkbox.addEventListener('change', (ev) => localStorage.setItem("night", ev.target.checked));

checkbox.checked = JSON.parse(localStorage.getItem("night")) === true;

document.onload = getNight();

