var Gpio = require('onoff').Gpio;
var extend = require('util')._extend;

function GarageGate(options) {
  if (!(this instanceof GarageGate)) 
    return new GarageGate(options);

  this.options = extend({
    onChange: function(status) {},
    pin: 23,
    buttonPin: 24,
    interval: 300
  }, options || {});

  this.status = null;

  this.sensor = new Gpio(this.options.pin, 'in');
  this.button = new Gpio(this.options.buttonPin, 'out');

  var that = this;

  setInterval(function() {
    that.update();
  }, this.options.interval);
}

GarageGate.prototype.update = function() {
  var that = this;

  this.sensor.read(function(err, value) {
    if (that.status == value)
      return;

    that.status = value;
    that.options.onChange(value);
  });
};

GarageGate.prototype.click = function() {
  var button = this.button;

  button.write(1, function() {
    setTimeout(function() {
      button.writeSync(0);
    }, 100);
  });
};

module.exports = GarageGate;
