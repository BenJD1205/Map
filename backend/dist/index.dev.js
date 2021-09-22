"use strict";

require('dotenv').config();

var express = require('express');

var mongoose = require('mongoose');

var pinRoute = require('./routes/pins');

var userRoute = require('./routes/users');

var app = express(); //middleware

app.use(express.json());
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log("Database connected!");
})["catch"](function (err) {
  return console.log(err);
});
app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);
app.listen(5000, function () {
  console.log("Backend server is running");
});