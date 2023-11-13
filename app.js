const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "/public")));

app.use((req, res) => {

    res.status(404).sendFile(relpath("/public/404.html"));
});

app.listen(3000, () => console.log("Listening..."));


function relpath(pth) {
    return path.join(__dirname, pth);
}