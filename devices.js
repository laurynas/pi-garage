const GarageTemperatureSensor = require('./devices/temperature_sensor');

module.exports = (app) => {
  GarageTemperatureSensor(temperature => {
    app.emit('devices:garage-temperature', temperature);
  });
}
