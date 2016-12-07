var express = require('express');
var app = express();
var userRoutes = require("./userRoutes");
var settingsRoutes = require("./settingsRoutes");
// API service
app.use("/users",userRoutes);
app.use("/settings",settingsRoutes);

module.exports = app;
