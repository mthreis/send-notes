
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
        notes.innerHTML += renderTask(p);
    }
}

function confirmDelete() {
    if (confirm("Are you sure you want to delete it?")) {
       console.log("delete");
    }
}

function confirmRevert(encodedTask) {
    const task = JSON.parse(decodeURIComponent(encodedTask));
    
    if (confirm("Are you sure you want to revert its state?")) {
        console.log("revert ", task);

        //delete task.date[task.date.length - 1];

        task.date.pop();

        console.log("new task:", task.date);
        
        document.getElementById(task.cardId).innerHTML = renderTask(task, true);
        saveTask(task);
    }
}

function advance(encodedTask) {

    const task = JSON.parse(decodeURIComponent(encodedTask));

    let now = new Date();
    //now.setFullYear(now.getFullYear() + task.date.length);

    task.date[task.date.length] = now;
    
    document.getElementById(task.cardId).innerHTML = renderTask(task, true);

    saveTask(task);
}

function saveTask(task) {
    var id = tasks.findIndex(t => t.id === task.id);

    tasks[id] = task;

    console.log(tasks);
}

function renderCards() {
    const notes = document.getElementById("notes");

    notes.innerHTML = "";
    let i = 0;

    //console.log(Object.entries(tasks));

    const ordTasks = Object.entries(tasks);
    ordTasks.sort(function(a, b) {return new Date(a.date) - new Date(b.date) });

    for(let a of ordTasks) {
        const key = parseInt(a[0]);
        const value = a[1];

        console.log(`${ key }:`, value);

        notes.innerHTML += renderTask(value, false);
    }

    //console.log(tasks);

    //while(i < tasks.length) {
    //    notes.innerHTML += renderTask(tasks[i]);
    //    i++;
    //}
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

function renderTask(task, innerOnly = false) {

   // for(let d in task.date) {
    //    task.date[d] = new Date(task.date[d]);
    //}

    //console.log(task);

    const t = task;

    task.cardId = `cardId${ task.id }`;

    const encodedTask = encodeURIComponent(JSON.stringify(t));

    const checkImg = "check-" + (task.date.length >= taskState.length - 1 ? "done" : "review");

    const inner = `
    <div class="${ taskState[task.date.length - 1].class }"  onmouseleave="popup(false)" onmouseenter="popup(true, '${ encodedTask }')" >${ formatDate(new Date(task.date[task.date.length - 1])) }</div>
    <input type="text" name="name" value="${ task.content }" placeholder="Task name" />
    <div class="actions">
        ${ task.date.length > 1 ? `<button onclick="confirmRevert('${ encodedTask }')"><img src="./img/revert.png" height="20px" alt=""></button>` : `` }
        ${ task.date.length >= taskState.length ? `` : `<button onclick="advance('${ encodedTask }')"><img src="./img/check.png" height="20px" alt=""></button>` }
        <div class="actionsSep"> a</div>
        <button onclick="confirmDelete()"><img src="./img/trash.png" height="20px" alt=""></button>
    </div>
    `;

    if (innerOnly) return inner;

    const html = `
    <div class="card" id="cardId${ task.id }">
        ${ inner }
    </div>
    `;

    //console.log(html);

    return html;
}

function popup(enable, encodedTask) {
    //console.log("popup: ", enable);
    

    popupPanel.setAttribute("id", enable ? "popupShown" : "popup");

    if (enable) {
        const task = JSON.parse(decodeURIComponent(encodedTask));
        popupReview.setAttribute("class", task.date.length > 1 ? "popupTitle" : "hidden");
        popupDone.setAttribute("class", task.date.length > 2 ? "popupTitle" : "hidden");
    }
}

var popupPanel = document.getElementById("popup");
var popupAdded = document.getElementById("popupAdded");
var popupReview = document.getElementById("popupReview");
var popupDone = document.getElementById("popupDone");




var checkbox = document.getElementById("night");

//console.log("NIGHT> ", localStorage.getItem("night"));

function movePopup(e) {
   // console.log(e);

    popupPanel.style.left = e.clientX + 20 + "px";
    popupPanel.style.top = e.clientY  + 20 +"px";
} 

document.addEventListener("mousemove", (e) => {  movePopup(e); });

checkbox.addEventListener('change', (ev) => localStorage.setItem("night", ev.target.checked));

checkbox.checked = JSON.parse(localStorage.getItem("night")) === true;

tasks = [
    {
        id: 0,
        date: [ new Date(2000, 3, 14, 5, 11, 1, 11) ],
        content: 'New task 1'
    },
    {
        id: 1879,
        date: [ new Date(2005, 3, 14, 5, 11, 1, 11) ],
        content: 'New task 2'
    },
    {
        id: 12,
        date: [ new Date(2010, 3, 14, 5, 11, 1, 11) ],
        content: 'New task 3'
    }
];


localStorage.setItem("tasks", JSON.stringify(tasks));

//console.log(tasks);

//document.onload = getNight();
document.onload = renderCards();

