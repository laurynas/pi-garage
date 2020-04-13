var sensors = require('ds1820-temp');

function TemperatureSensor(callback) {
  if (!(this instanceof TemperatureSensor)) {
    return new TemperatureSensor(callback);
  }

  this.temperature = null;
  this.onChange = callback;
  this.update();

  var that = this;

  setInterval(function() {
    that.update();
  }, 60 * 1000);
};

TemperatureSensor.prototype.update = function() {
  var that = this;

  sensors.readDevices(function(err, devices) {
    var device = devices[0];
    value = parseFloat(parseFloat(device.value).toFixed(1));

    if (that.temperature == value)
      return;

    that.temperature = value;
    that.onChange(that.temperature);
  });
};

module.exports = TemperatureSensor;
