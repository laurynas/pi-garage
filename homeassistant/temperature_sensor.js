const config = require('../config');
const device = require('./device');

const id = 't1';

const baseTopic = config.mqtt_discovery_prefix + '/sensor/' + id;
const configTopic = baseTopic + '/config';
const stateTopic = baseTopic + '/state';

module.exports = (client, app) => {
  app.on('devices:garage-temperature', value => {
    client.publish(stateTopic, value.toString(), { retain: true });
  });

  client.publish(configTopic, JSON.stringify({
    unique_id: id,
    device_class: 'temperature',
    name: 'Garage',
    state_topic: stateTopic,
    unit_of_measurement: '°C',
    value_template: '{{ value | float }}',
    device,
  }), {
    retain: true,
  });
};
