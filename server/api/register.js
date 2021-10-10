const express = require("express");
const bcrypt = require("bcryptjs");
const { register } = require("./path");
const { vendor, customer } = require("../models/schema");

const app = express.Router();

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

app.post(register.register, (req, res) => {
  const { id, name, whatsupNo, email, birthdate, password, homeAddress, role } =
    req.body;
  const hashedPassword = hashPassword(password);

  if (role === "vendor") {
    vendor
      .create({
        id: id,
        whatsupNo: whatsupNo,
        name: name,
        birthdate: birthdate,
        email: email,
        password: hashedPassword,
        LocationWard: homeAddress,
        imageUrl: "",
      })
      .then((results) => {
        console.log(res);
        res.json(results).status(201);
      })
      .catch((err) => {
        console.log(err);
        res.json(err).status(409);
      });
  } else {
    const { id, name, whatsupNo, email, homeAddress, password, token } =
      req.body;
    const hashedPassword = hashPassword(password);

    customer
      .create({
        id: id,
        whatsupNo: whatsupNo,
        name: name,
        email: email,
        password: hashedPassword,
        LocationWard: homeAddress,
        token: token,
      })
      .then((results) => {
        console.log(res);
        res.json(results).status(201);
      })
      .catch((err) => {
        console.log(err);
        res.json(err).status(409);
      });
  }
});
module.exports = app;
