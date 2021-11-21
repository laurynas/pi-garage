const TemperatureSensor = require('./cozytouch/temperature_sensor');
const ElectricEnergyConsumptionSensor = require('./cozytouch/electric_energy_consumption_sensor');

let initialized = false;

module.exports = (client, app) => {
  app.on('devices:cozytouch', devices => {
    devices.forEach(device => {
      (device.states || []).forEach(state => {
        switch (state.name) {
          case 'core:ElectricEnergyConsumptionState':
            ElectricEnergyConsumptionSensor(client, device, state);
            break;
          }
      });

      device.sensors.forEach(sensor => {
        (sensor.states || []).forEach(state => {
          switch (state.name) {
            case 'core:TemperatureState':
              TemperatureSensor(client, sensor, state);
              break;
            }
          }
        );
      })
    });

    initialized = true;
  });
};

