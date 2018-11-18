module.exports = function(app, tokenService) {

    app.post('/login', function(req, res) {
      tokenService.login(req.body, function(output) {
        if(!output){
          res.status(404).send();
        } else {
          res.send(output);
        }
      });
    })

    app.get('/checkToken', function(req, res) {
      tokenService.checkToken(req.headers.token, function(output) {
        res.send(output);
      });
    })
  }
