var express = require("express");
var app = express.Router();
const { vendor } = require("../models/schema");
const { vendors } = require("./path");
require("dotenv").config({ path: "../models/.env" });

app.post(vendors.create, (req, res) => {
  const { id, name, whatsupNo, email, birthdate, password } = req.body;

  vendor
    .create({
      id: id,
      whatsupNo: whatsupNo,
      name: name,
      birthdate: birthdate,
      email: email,
      password: password,
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

app.get(vendors.get, (req, res) => {
  if (req.query.id) {
    vendor
      .findOne({
        where: {
          id: `${req.query.id}`,
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
    vendor
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

app.put(vendors.update, (req, res) => {
  const { id, name, whatsupNo, email, birthdate } = req.body;

  if (req.query) {
    vendor
      .update(
        {
          id: id,
          whatsupNo: whatsupNo,
          name: name,
          birthdate: birthdate,
          email: email,
        },
        {
          where: {
            id: req.query.id,
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

app.delete(vendors.delete, (req, res) => {
  if (req.query) {
    vendor
      .destroy({
        where: {
          id: req.query.id,
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
