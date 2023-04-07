const express = require("express");
const cors = require("cors");
const config = require("../config");

const app = express();

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

//middleware
if (config.isVercel) {
  app.use(async (req, res, next) => {
    return next();
  });
}

module.exports = app;
