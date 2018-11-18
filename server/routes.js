const express = require('express');
const router = express.Router();
var rpioService = require('./services/rpioService');
var tokenService = require('./services/tokenService');

router.use(function timeLog (req, res, next) {
  // API Middleware Code
  console.log('Time: ', Date.now() + ' - Url: ' + req.url);
  next();
});
module.exports = router;
require('./controllers/rpioController')(router, rpioService);
require('./controllers/tokenController')(router, tokenService);

