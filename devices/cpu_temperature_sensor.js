const si = require('systeminformation');

const CPUTemperatureSensor = (callback) => {
  const update = () => si.cpuTemperature(value => {
    console.log(value);
    console.log(value / 1000);
    callback(value / 1000)
  });

  update();
  setInterval(() => update(), 60 * 1000);
};

module.exports = CPUTemperatureSensor;
