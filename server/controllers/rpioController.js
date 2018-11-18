module.exports = function(app, rpioService) {

    app.get('/openOutputPin/:pin/:value', function(req, res) {
      rpioService.openOutputPin(req.params.pin, req.params.value, function(output) {
        res.send(output);
      });
    })

    app.get('/setPinValue/:pin/:value', function(req, res) {
      rpioService.setPinValue(req.params.pin, req.params.value, function(output) {
        res.send(output);
      });
    })

    app.get('/closePin/:pin', function(req, res) {
      rpioService.closePin(req.params.pin, function(output) {
        res.send(output);
      });
    })

    app.get('/getAllTemps', function(req, res) {
      rpioService.getAllTemps(function(output) {
        res.send(output);
      });
    })

    app.get('/setPinsOff', function(req, res) {
      rpioService.setPinsOff(function(output){
        res.send(output);
      });
    });

    app.get('/getPinList', function(req, res) {
      rpioService.getPinList(function(output){
        res.send(output);
      });
    });
  }
