const si = require('systeminformation');

const CPUTemperatureSensor = (callback) => {
  const update = () => si.cpuTemperature(value => callback(value / 1000));

  update();
  setInterval(() => update(), 60 * 1000);
};

module.exports = CPUTemperatureSensor;
