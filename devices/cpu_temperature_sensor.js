const si = require('systeminformation');

const CPUTemperatureSensor = (callback) => {
  const update = () => {
    si.cpuTemperature(result => {
      callback(result.main);
    });
  };

  update();
  setInterval(() => update(), 60 * 1000);
};

module.exports = CPUTemperatureSensor;
