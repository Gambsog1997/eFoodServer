var express = require("express");
var app = express.Router();
const { order, customer, vendor, Sequelize } = require("../models/schema");
const { orders } = require("./path");

app.post(orders.create, (req, res) => {
  const { id, CustomerId, VendorId, food, count } = req.body;

  order
    .create({
      id: id,
      CustomerId: CustomerId,
      VendorId: VendorId,
      food: food,
      count: count,
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

app.get(orders.getUnique, (req, res) => {
  order
    .findAll({
      attributes: [
        Sequelize.fn("DISTINCT", Sequelize.col("CustomerId")),
        "CustomerId",
      ],
      // include: [
      //   {
      //     model: customer,
      //   },
      // ],
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

app.get(orders.getByCustomer, (req, res) => {
  if (req.query.id) {
    order
      .findAll({
        where: {
          CustomerId: `${req.query.id}`,
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
  }
});

app.get(orders.get, (req, res) => {
  if (req.query.id) {
    order
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
    order
      .findAll({
        include: [
          {
            model: customer,
          },
          {
            model: vendor,
          },
        ],
      })
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

app.put(orders.update, (req, res) => {
  const { name } = req.body;

  if (req.query) {
    order
      .update(
        {
          name: name,
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

app.delete(orders.delete, (req, res) => {
  if (req.query) {
    order
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
        res.json(err).status(404);
      });
  }
});

module.exports = app;
