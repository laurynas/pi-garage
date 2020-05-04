const TemperatureSensor = require('./cozytouch/temperature_sensor');

let initialized = false;

module.exports = (client, app) => {
  app.on('devices:cozytouch', setup => {
    setup.devices.forEach(device => {
      device.states.forEach(state => {
        switch (state.name) {
          case 'core:TemperatureState':
            TemperatureSensor(client, device, state);
            break;
        }
      });
    });

    initialized = true;
  });
};
