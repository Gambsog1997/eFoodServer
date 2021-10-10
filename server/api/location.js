var express = require("express");
var app = express.Router();
const { location } = require("../models/schema");
const { locations } = require("./path");
require("dotenv").config({ path: "../models/.env" });

app.post(locations.create, (req, res) => {
  const { ward, district, region } = req.body;

  location
    .create({
      ward: ward,
      district: district,
      region: region,
    })
    .then((results) => {
      console.log(res);
      res.json(results).status(201);
    })
    .catch((err) => {
      console.log(err);
      res.json(err).status(409);
    });
});

app.get(locations.get, (req, res) => {
  if (req.query.ward) {
    location
      .findOne({
        where: {
          ward: `${req.query.ward}`,
        },
      })
      .then((results) => {
        console.log(results);
        res.json(results).status(200);
      })
      .catch((err) => {
        console.log(err);
        res.json(err).status(404);
      });
  } else {
    location
      .findAll()
      .then((results) => {
        console.log(results);
        res.json(results).status(200);
      })
      .catch((err) => {
        console.log(err);
        res.json(err).status(404);
      });
  }
});

app.put(locations.update, (req, res) => {
  const { ward, district, region } = req.body;

  if (req.query) {
    location
      .update(
        {
          ward: ward,
          district: district,
          region: region,
        },
        {
          where: {
            ward: req.query.ward,
          },
        }
      )
      .then((results) => {
        console.log(results);
        res.json(results).status(200);
      })
      .catch((err) => {
        console.log(err);
        res.json(err).status(404);
      });
  }
});

app.delete(locations.delete, (req, res) => {
  if (req.query) {
    location
      .destroy({
        where: {
          ward: req.query.ward,
        },
      })
      .then((results) => {
        console.log(results);
        res.json(results).status(200);
      })
      .catch((err) => {
        console.log(err);
        res.json(err).status(401);
      });
  }
});

module.exports = app;
