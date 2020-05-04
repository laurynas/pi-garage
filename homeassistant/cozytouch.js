const TemperatureSensor = require('./cozytouch/temperature_sensor');

let initialized = false;

module.exports = (client, app) => {
  app.on('devices:cozytouch', setup => {
    setup.devices.forEach(device => {
      device.states.forEach(state => {
        switch (state.name) {
          case 'core:TemperatureState':
            const sensor = TemperatureSensor(device, state);

            if (!initialized) {
              client.publish(sensor.configTopic, JSON.stringify(sensor.config), { retain: true });
            }

            client.publish(sensor.stateTopic, state.value.toString(), { retain: true });
            break;
        }
      });
    });

    initialized = true;
  });
};
