var express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var { authenticate } = require("../api/path");
var { vendor, customer } = require("../models/schema");
require("dotenv").config({ path: "../models/.env" });

var app = express.Router();

const vendorMiddleware = (req, res, next) => {
  console.log("in vendor");
  const { whatsupNo, password } = req.body;
  var exists = false;

  vendor
    .findOne({
      where: {
        whatsupNo: `${whatsupNo}`,
      },
    })
    .then((results) => {
      if (results) {
        const user = results.dataValues;
        if (user) {
          exists = true;
          console.log(exists);
        }
        const authority = bcrypt.compareSync(password, user.password);

        if (authority) {
          const token = jwt.sign(
            {
              whatsupNo,
              password: user.password,
            },
            user.password,
            {
              expiresIn: "24h",
            }
          );
          console.log(results);
          req.body.exists = exists;
          res.json({ ...user, token, role: "vendor" }).status(200);
        }
      } else {
        return next();
      }
    })
    .catch((err) => {
      console.log(err.data);
      res.json(err).status(404);
    });
};
const customerMiddleWare = (req, res, next) => {
  console.log("in customer");
  const { whatsupNo, password } = req.body;

  customer
    .findOne({
      where: {
        whatsupNo: `${whatsupNo}`,
      },
    })
    .then((results) => {
      if (results) {
        const user = results.dataValues;
        userCheck = user;
        const authority = bcrypt.compareSync(password, user.password);

        if (authority) {
          const token = jwt.sign(
            {
              whatsupNo,
              password: user.password,
            },
            user.password,
            {
              expiresIn: "24h",
            }
          );
          console.log(results, req.body.exists);
          res.json({ ...user, token, role: "customer" }).status(200);
        }
      } else {
        return next();
      }
    })
    .catch((err) => {
      console.log(err.data);
      res.json(err).status(404);
    });
};

app.post(
  authenticate.authentication,
  vendorMiddleware,
  customerMiddleWare,
  (req, res) => {
    res.json({ msg: "don't exist" }).status("404");
  }
);

module.exports = app;
