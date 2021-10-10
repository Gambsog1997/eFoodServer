const Sequelize = require("sequelize");
require("dotenv").config({ path: `${__dirname}/.env` });

console.log(process.env.DIALECT);

const connectToDb = () => {
  var sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.MY_USERNAME,
    process.env.PASSWORD,
    {
      host: process.env.HOST,
      dialect: process.env.DIALECT,
    }
  );
  return sequelize;
};

module.exports = {
  connectToDb: connectToDb,
  Sequelize: Sequelize,
};
