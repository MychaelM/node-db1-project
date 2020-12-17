const express = require("express");
const accountsRouter = require('../accounts/accounts-router');

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use("/accounts", accountsRouter);

server.get("/", async (req, res, next) => {
  try {
    res.json({
      message: "Welcome to the server",
    });
  } catch (err) {
    next(err);
  }
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong",
  });
});

module.exports = server;
