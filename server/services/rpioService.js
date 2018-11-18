var rpio = require('rpio');
var sensor = require('ds18x20');
var pinType = require('../enums/gpioEnum');
var pinList = [];

sensor.isDriverLoaded(function (err, isLoaded) {
    console.log(isLoaded);
});

module.exports = {
  openOutputPin: function(pin,value, cb) {
	return openOutputPin(parseInt(pin), parseInt(value), cb);
    },
  setPinValue: function(pin, value, cb) {
	return setPinValue(parseInt(pin), parseInt(value), cb);
    },
  closePin: function(pin, cb) {
    return closePin(parseInt(pin), cb);
    },
  getAllTemps: function(cb) {
    return getAllTemps(cb);
    },
  setPinsOff: function(cb) {
      setPinsOff(cb);
  },
  getPinList: function(cb) {
      cb(pinList);
  }
};

function openOutputPin(pin,value, cb) {
    try {
        if(!isPinOpen(pin)) {
            if(value == pinType.HIGH) {
                rpio.open(pin, rpio.OUTPUT, rpio.HIGH); 
            } else if(value == pinType.LOW) {
                rpio.open(pin, rpio.OUTPUT, rpio.LOW); 
            }
            updatePinList(pin, pinType.OPEN,value);
            cb(true);
        } else {
            setPinValue(pin, value, function(){
                cb(true);
            })
        }
    } catch {
        cb(false);
    }
}
function setPinValue(pin, value, cb) {
    try{
        if(isPinOpen(pin)){
            if(value == pinType.HIGH) {
                rpio.write(pin, rpio.HIGH); 
            } else if(value == pinType.LOW) {
                rpio.write(pin, rpio.LOW); 
            }
        } else {
            openOutputPin(pin, value, function() {})
        }
        updatePinList(pin, pinType.SET, value);
        cb(true);
    } catch {
        cb(false);
    }
}
function setPinsOff(cb) {
    try{
        for(i = 0; i < pinList.length; i++) {
            console.log(pinList[i].Pin);
            setPinValue(pinList[i].Pin, pinType.LOW, function() {});
        }
        cb(true);
     } catch {
        cb(false);
    }
}
function closePin(pin, cb) {
    try{
        setPinValue(pin, pinType.LOW, function(){
            rpio.close(pin, rpio.PIN_RESET);
            updatePinList(pin, pinType.CLOSE);
            cb(true);
        });
    } catch {
        cb(false);
    }
}
function getAllTemps(cb) {
    sensor.getAll(function (err, tempObj) {
        console.log(tempObj);
        cb(tempObj);
    });
}
function updatePinList(pin, type, value=null) {
    var pin = {
        Pin: pin,
        Value: value
    }
    if(type === pinType.CLOSE) {
        console.log(pinList.findIndex(p => p.Pin == pin.Pin));
        pinList.splice(pinList.findIndex(p => p.Pin == pin.Pin), 1);
    }
    if(type === pinType.OPEN) {
        pinList.push(pin);
    }
    if(type === pinType.SET) {
        if(pinList.findIndex(p => p.Pin == pin.Pin) == -1) {
            openOutputPin(pin.Pin, pin.Value);
            updatePinList(pin.Pin, pinType.OPEN, pin.Value);
        } else {
            pinList[pinList.findIndex(p => p.Pin == pin.Pin)].Value = pin.Value;
        }
    }
}
function isPinOpen(pin) {
     if(pinList.findIndex(p => p.Pin == pin) != -1) {
         return true;
     }
     return false;
}


