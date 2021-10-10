var express = require("express");
var app = express.Router();
var { Expo } = require("expo-server-sdk");
const { orders } = require("../../server/api/path");
const expo = new Expo();

const createNotificationMiddleware = (req, res, next) => {
  const { token, name, phone } = req.body;

  let bodyTitle = `Order from ${name}`;
  let messages = [];

  // Check that all your push tokens appear to be valid Expo push tokens
  if (!Expo.isExpoPushToken(token)) {
    console.error(`Push token ${token} is not a valid Expo push token`);
    res.json({ message: "Doesn't exist" });
  }

  messages.push({
    to: token,
    sound: "default",
    title: "New order",
    subtitle: "Louis",
    body: bodyTitle,
    data: {
      name,
      phone,
    },
  });

  const chunks = expo.chunkPushNotifications(messages);

  req.chunks = chunks;
  console.log("====================================");
  console.log(name, phone);
  console.log("====================================");
  next();
};

const sendNotificationAsync = async (req, res, next) => {
  let tickets = [];
  for (let chunk of req.chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
      // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
    } catch (error) {
      console.error(error);
    }
  }
  req.ticket = tickets;
  next();
};

app.post(
  orders.token,
  createNotificationMiddleware,
  sendNotificationAsync,
  (req, res) => {
    res.json(req.ticket).status(200);
  }
);

module.exports = app;
