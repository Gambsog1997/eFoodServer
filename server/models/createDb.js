var pgtools = require("pgtools");
require("dotenv").config();

const config = {
  user: process.env.MY_USERNAME,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  port: process.env.PG_PORT,
};

const createDb = () => {
  pgtools.createdb(config, `${process.env.DATABASE}`, (err, res) => {
    if (err) {
      console.log("it exists");
    } else {
      console.log(err);
    }
  });
};
module.exports = createDb;
