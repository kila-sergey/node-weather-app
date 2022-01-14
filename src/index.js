const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

const { getGeocode, getWeather } = require("./utils");

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views/views");
const partialsPath = path.join(__dirname, "../views/partials");

//Setup handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Main",
    helpText: "Search for the weather in your region.",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "Some text to help",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "address wasn't provided",
    });
  }
  getGeocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      res.send({ error });
    } else {
      getWeather(latitude, longitude, (error, weatherData) => {
        if (error) {
          res.send({ error });
        } else {
          res.send({
            ...weatherData,
            address,
            location,
          });
        }
      });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help:404",
    errorText: "This Subdirectory of Help-page doesn't exists",
    backTo: {
      href: "/help",
      text: "Help",
    },
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
