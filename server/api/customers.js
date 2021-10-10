var express = require("express");
var app = express.Router();
const { customer } = require("../models/schema");
const { customers } = require("./path");
require("dotenv").config({ path: "../models/.env" });

app.post(customers.create, (req, res) => {
  const { id, name, whatsupNo, email, birthdate, LocationWard } = req.body;

  customer
    .create({
      id: id,
      whatsupNo: whatsupNo,
      name: name,
      birthdate: birthdate,
      email: email,
      LocationWard: LocationWard,
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

app.get(customers.getByName, (req, res) => {
  customer
    .findOne({
      where: {
        name: `${req.query.name}`,
      },
      attributes: ["id"],
    })
    .then((results) => {
      console.log(results);
      res.json(results).status(200);
    })
    .catch((err) => {
      console.log(err);
      res.json(err).status(404);
    });
});

app.get(customers.get, (req, res) => {
  if (req.query.id) {
    customer
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
    customer
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

app.put(customers.update, (req, res) => {
  const { id, name, whatsupNo, email, birthdate } = req.body;

  if (req.query) {
    customer
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

app.delete(customers.delete, (req, res) => {
  if (req.query) {
    customer
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
