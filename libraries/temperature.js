var ds18x20 = require('ds18x20');
var sensorId = ds18x20.list()[0];
var updateInterval = 60;
var temperature;
var onChange;

function init(callback) {
  onChange = callback;
  update();
  setInterval(update, updateInterval * 1000);
};

function update() {
  ds18x20.get(sensorId, function(err, value) {
    if (temperature == value)
      return;

    temperature = value;
    onChange(temperature);
  });
};

module.exports = { init: init };

