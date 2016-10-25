var express = require('express'),
    app = express();
// API service
app.get("/api/users",function(req, res, next) {
 res.send("users list")
});
app.get('/api/posts', function(req, res, next) {
 res.send("posts list")
});

module.exports = app;
