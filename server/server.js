const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const vendor = require("./api/vendors");
const food = require("./api/food");
const register = require("./api/register");
const authenticate = require("./authentication/authenticate");
const customer = require("./api/customers");
const location = require("./api/location");
const tokenOrder = require("./api/token");
const order = require("./api/order");
const foodList = require("./api/vendorFoodList");
const { sequelize } = require("./models/schema");
require("dotenv").config({ path: "./models/.env" });

const app = express();
const port = process.env.SERVER_PORT;

app.use(bodyParser.json());
app.use(cors());
app.use("/", authenticate);
app.use("/", foodList);
app.use("/", vendor);
app.use("/", food);
app.use("/", customer);
app.use("/", location);
app.use("/", order);
app.use("/", register);
app.use("/", tokenOrder);

var server = app.listen(port, () => {
  sequelize.sync();
  console.log(`listening on port ${port}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("on connecting");
  io.sockets.emit("broadcast", { message: "user connected" });
});
