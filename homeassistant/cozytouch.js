const TemperatureSensor = require('./cozytouch/temperature_sensor');
const ElectricEnergyConsumptionSensor = require('./cozytouch/electric_energy_consumption_sensor');

module.exports = (client, app) => {
  app.on('devices:cozytouch', device => {
    device.states
      .filter(state => state.name == 'core:ElectricEnergyConsumptionState')
      .forEach(state => ElectricEnergyConsumptionSensor(client, device, state));

    const deviceAndSensors = [device].concat(device.sensors);

    deviceAndSensors.forEach(sensor => {
      sensor.states
        .filter(state => state.name == 'core:TemperatureState')
        .forEach(state => TemperatureSensor(client, sensor, state));
    });
  });
};

