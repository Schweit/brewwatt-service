var express = require('express');
var path = require('path');
var http = require('http');
var app = express();
var routes = require('./server/routes');
app.use(express.json());
app.use('/rpio', routes);
app.use('/token', routes);

app.get('/test', function(req, res) {
  res.send("Something");
});

var httpServer = http.createServer(app);
httpServer.listen(8081, function() {
    console.log("Started Service");
});
