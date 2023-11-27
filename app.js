
require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

app.use("/api", require("./api/main"));

app.use(express.static(path.join(__dirname, "/public")));

app.use((req, res) => {

    res.status(404).sendFile(relpath("/other/404.html"));
});



app.listen(3000, () => console.log(`Listening...`));


function relpath(pth) {
    return path.join(__dirname, pth);
}