const sensors = require('ds1820-temp');

let temperature = null;

const TemperatureSensor = (callback) => {
  const update = () => {
    sensors.readDevices((_err, devices) => {
      const device = devices[0];

      console.log(devices);

      value = parseFloat(parseFloat(device.value).toFixed(1));

      if (temperature == value)
        return;

      temperature = value;

      callback(temperature);
    });
  };

  setInterval(() => update(), 60 * 1000);
};

module.exports = TemperatureSensor;
