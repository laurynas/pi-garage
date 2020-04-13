const sensors = require('ds1820-temp');

const TemperatureSensor = (deviceId, callback) => {
  let temperature = null;

  const update = () => {
    sensors.readDevice(deviceId, (err, device) => {
      if (err) {
        console.log(err);
        return;
      }

      const value = normalize(device.value);

      if (temperature == value)
        return;

      temperature = value;

      callback(temperature);
    });
  };

  update();
  setInterval(() => update(), 60 * 1000);
};

const normalize = (value) => parseFloat(parseFloat(value).toFixed(1));

module.exports = TemperatureSensor;
