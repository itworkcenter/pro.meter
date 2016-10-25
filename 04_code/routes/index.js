var express = require('express'),
    app = express(),
    userRoutes = require("./userRoutes");
// API service
app.use("/users",userRoutes);

module.exports = app;
