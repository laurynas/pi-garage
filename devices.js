const GarageTemperatureSensor = require('./devices/temperature_sensor');

export default app => {
  GarageTemperatureSensor(temperature => {
    app.emit('devices:garage-temperature', temperature);
  });
}
