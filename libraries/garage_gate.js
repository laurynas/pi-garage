var gpio = require('pi-gpio');
var extend = require('util')._extend;

function GarageGate(options) {
  if (!(this instanceof GarageGate)) 
    return new GarageGate(options);

  this.options = extend({
    onChange: function(status) {},
    pin: 16,
    buttonPin: 18,
    interval: 300
  }, options || {});

  this.status = null;

  gpio.open(this.options.pin, 'input');

  var that = this;

  setInterval(function() {
    that.update();
  }, this.options.interval);
}

GarageGate.prototype.update = function() {
  var that = this;

  gpio.read(that.options.pin, function(err, value) {
    if (that.status == value)
      return;

    that.status = value;
    that.options.onChange(that.status);
  });
};

GarageGate.prototype.click = function() {
  var pin = this.options.buttonPin;

  gpio.open(pin, function(err) {
    gpio.write(pin, 1, function() {
      setTimeout(function() {
        gpio.write(pin, 0, function() {
          gpio.close(pin);
        });
      }, 100);
    });
  });
};

module.exports = GarageGate;
