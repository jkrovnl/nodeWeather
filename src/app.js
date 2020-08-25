const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname,'../public'));

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs"); //module we installed "npm i hbs"
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Wheather App",
    name: "Andrew Mead",
  });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    content: "This is our help. We always seek to help weak ones.",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.render("404", {
      title: "Weather",
      errorMessage: "You must provide an address.",
    });
  }
  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({
        error: "Unable to locate location.",
      });
    }
    forecast(latitude, longitude, (err, forescastData) => {
      if (err) {
        res.send({
          error: "Unable to forecast location.",
        });
      }
      res.send({
        forecast: forescastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help",
    errorMessage: "Help article not found.",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "404 - Page not found.",
    title: "Weather App",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
