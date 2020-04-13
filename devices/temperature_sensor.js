const sensors = require('ds1820-temp');

let temperature = null;

const TemperatureSensor = (deviceId, callback) => {
  const update = () => {
    sensors.readDevice(deviceId, (_err, device) => {
      console.log(device);

      value = parseFloat(parseFloat(device.value).toFixed(1));

      if (temperature == value)
        return;

      temperature = value;

      callback(temperature);
    });
  };

  update();
  setInterval(() => update(), 60 * 1000);
};

module.exports = TemperatureSensor;
