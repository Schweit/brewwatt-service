var express = require('express');
var path = require('path');
var http = require('http');
var app = express();
var routes = require('./server/routes');
var moment = require('moment');

app.use('/rpio', routes);
app.use('/temp', routes);
app.use(moment);

app.get('/test', function(req, res) {
  res.send("Something");
});

var httpServer = http.createServer(app);
httpServer.listen(8081, function() {
    console.log("Started Service");
});
