
function getNight() {
    const night = localStorage.getItem("night");
    //console.log("night", night);
}

async function getData() {
    ///<p><b>Matheus Reis</b> is?? y/o.</p>

    const notes = document.getElementById("notes");

    const response = await fetch("/api");
    const result = await response.json();

    console.log(result);

    notes.innerHTML = "";

    for(let p of result) {
        notes.innerHTML += renderCard(p);
    }
}

function confirmDelete() {
    if (confirm("Are you sure you want to delete it?")) {
       console.log("delete");
    }
}

function renderCards() {
    const notes = document.getElementById("notes");

    notes.innerHTML = "";
    let i =0;
    while(i < 20) {
        notes.innerHTML += renderCard({
            date: [ new Date() ],
            content: 'New task'
        });
        i++;
    }
}

function formatDate(date) {

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const hour = date.getHours();
    const min = String(date.getMinutes()).padStart(2, '0');

    return `${ year }/${ month }/${ day } -- ${ hour }:${ min }`;
}

const taskState = [
    {
        class: "cardTime"
    },
    {
        class: "cardTimeReview"
    },
    {
        class: "cardTimeDone"
    }
];

function renderCard(card) {

    //console.log(card.date[0].getHours());

    return `
    <div class="card">
        <div class="cardTime">${ formatDate(card.date[card.date.length - 1]) }</div>
        <input type="text" name="name" value="${ card.content }" placeholder="Task name" />
        <div class="actions">
            <button onclick="confirmDelete()"><img src="./img/trash.png" height="20px" alt=""></button>
        </div>
    </div>
    `;
}

var checkbox = document.getElementById("night");

//console.log("NIGHT> ", localStorage.getItem("night"));

checkbox.addEventListener('change', (ev) => localStorage.setItem("night", ev.target.checked));

checkbox.checked = JSON.parse(localStorage.getItem("night")) === true;

//document.onload = getNight();
document.onload = renderCards();

