const express = require("express");
const app = express();

app.use(express.json());

let countries = [];

app
  .get("/countries", (req, res) => {
    try {
      if (countries.length > 0) {
        res.send(countries);
      } else {
        res.send("List is empty, please add new country!");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  })
  .post("/countries", (req, res) => {
    countries.push(req.body);
    res.send({
      message: "You have successfully created a new country",
      country: req.body,
    });
  })
  .delete("/countries", (req, res) => {
    countries = countries.filter((country) => {
      return country.name != req.body.name;
    });
    res.send(countries);
  })
  .put("/countries/:name", (req, res) => {
    const reqName = req.params.name;
    try {
      const index = countries.findIndex((country) => country.name == reqName);
      const { name, capital, population } = req.body;
      countries[index].name = name;
      countries[index].capital = capital;
      countries[index].population = population;

      res.send(countries);
    } catch (error) {
      res.status(500).send("Error");
    }
  })
  .patch("/countries/:name", (req, res) => {
    const reqName = req.params.name;
    try {
      const index = countries.findIndex((country) => country.name == reqName);
      const { name, capital, population } = req.body;
      countries[index].name = name;
      countries[index].capital = capital;
      countries[index].population = population;

      res.send(countries);
    } catch (error) {
      res.status(500).send("Error");
    }
  });

app.listen(3000, () => {
  console.log("App is running on port 3000...");
});
