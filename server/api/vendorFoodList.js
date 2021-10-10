var express = require("express");
const { Sequelize } = require("../models/connectToDb");
var app = express.Router();
const { foodList, food, vendor } = require("../models/schema");
const { foodLists } = require("./path");
require("dotenv").config({ path: "../models/.env" });

app.post(foodLists.create, (req, res) => {
  const { id, FoodId, VendorId, price } = req.body;

  foodList
    .create({
      id: id,
      food: FoodId,
      VendorId: VendorId,
      price: price,
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

app.get(foodLists.get, (req, res) => {
  if (req.query.id) {
    foodList
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
  } else if (req.query.foodId) {
    foodList
      .findAll({
        where: {
          food: `${req.query.foodId}`,
        },
        include: [
          {
            model: vendor,
            required: true,
          },
          {
            model: food,
            required: true,
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
  } else {
    foodList
      .findAll({
        include: {
          model: food,
          required: true,
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

app.get(foodLists.getByVendors, (req, res) => {
  if (req.query.id) {
    foodList
      .findAll({
        where: {
          VendorId: `${req.query.id}`,
        },
        attributes: [
          [Sequelize.fn("DISTINCT", Sequelize.col("food")), "food"],
          "id",
          "VendorId",
          "price",
          "count",
        ],
        include: {
          model: food,
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

app.put(foodLists.update, (req, res) => {
  const { count, food, VendorId } = req.body;

  if (count) {
    foodList
      .update(
        {
          count: count,
        },
        {
          where: {
            VendorId: VendorId,
            food: food,
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

app.delete(foodLists.delete, (req, res) => {
  if (req.query) {
    foodList
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
