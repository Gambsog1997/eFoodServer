var express = require("express");
var app = express.Router();
const { food, Sequelize, foodList } = require("../models/schema");
const { foodPath } = require("./path");

app.post(foodPath.create, (req, res) => {
  const { id, name, imageUrl } = req.body;

  food
    .create({
      id: id,
      name: name,
      imageUrl: imageUrl,
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

// app.get(foodPath.getByName, (req, res) => {
//   if (req.query.name) {
//     food
//       .findOne({
//         where: {
//           name: `${req.query.name}`,
//         },
//       })
//       .then((results) => {
//         console.log(results);
//         res.json(results).status(200);
//       })
//       .catch((err) => {
//         console.log(err);
//         res.json(err).status(404);
//       });
//   }
// });

app.get(foodPath.getByName, (req, res) => {
  if (req.query.name) {
    food
      .findOne({
        where: {
          name: `${req.query.name}`,
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

app.get(foodPath.get, (req, res) => {
  if (req.query.id) {
    food
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
    food
      .findAll({
        include: {
          model: foodList,
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

app.put(foodPath.update, (req, res) => {
  const { name } = req.body;

  if (req.query) {
    food
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

app.delete(foodPath.delete, (req, res) => {
  if (req.query) {
    food
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
