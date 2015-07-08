var ds18x20 = require('ds18x20');

function TemperatureSensor(callback) {
  if (!(this instanceof TemperatureSensor)) {
    return new TemperatureSensor(callback);
  }

  this.sensorId = ds18x20.list()[0];
  this.temperature = null;
  this.onChange = callback;
  this.update();

  setInterval(this.update, 60 * 1000);
};

TemperatureSensor.prototype.update = function() {
  var that = this;

  ds18x20.get(this.sensorId, function(err, value) {
    if (that.temperature == value)
      return;

    that.temperature = value;
    that.onChange(that.temperature);
  });
};

module.exports = TemperatureSensor;

