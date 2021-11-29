const lodash = require('lodash');
const config = require('../../config');
const prefix = config.mqtt_discovery_prefix;

const INITIALIZED = {};

module.exports = (client, device, state) => {
  const id = device.oid + '-' + lodash.snakeCase(state.name);
  const topic = prefix + '/sensor/' + id;
  const stateTopic = topic + '/state';
  const configTopic = topic + '/config';

  client.publish(stateTopic, state.value.toString(), { retain: true });

  if (INITIALIZED[id]) return;

  const config = {
    unique_id: id,
    device_class: 'power',
    name: device.label + ' ' + state.name,
    state_topic: stateTopic,
    unit_of_measurement: 'W',
    value_template: '{{ value | int }}',
    device: {
      identifiers: [device.oid],
      name: device.label,
      model: device.model,
    },
  }

  client.publish(configTopic, JSON.stringify(config), { retain: true });

  INITIALIZED[id] = true;
}
