const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 80;

app.use(express.static("./public"));
const newPath = path.join(__dirname, "/templates/views");

app.set('view engine', 'hbs');
app.set("views", newPath);

hbs.registerPartials("./templates/partials");

app.get("/", (req, res) => {
    res.render("index.hbs");
})
app.get("/about", (req, res) => {
    res.render("about.hbs");
})
app.get("/weather", (req, res) => {
    res.render("weather.hbs");
})
app.get("*", (req, res) => {
    res.render("404_Page.hbs");
})

app.listen(port, () => {
    console.log("App is listening on port 80");
})