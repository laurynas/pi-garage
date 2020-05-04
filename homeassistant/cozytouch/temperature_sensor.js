const lodash = require('lodash');
const config = require('../../config');
const prefix = config.mqtt_discovery_prefix;

module.exports = (device, state) => {
  const id = device.oid + '-' + lodash.snakeCase(state.name);
  const topic = prefix + '/sensor/' + id;
  const stateTopic = topic + '/state';

  const config = {
    unique_id: id,
    device_class: 'temperature',
    name: device.name + ' ' + state.name,
    state_topic: stateTopic,
    unit_of_measurement: '°C',
    value_template: '{{ value | float }}',
    device: {
      identifiers: [device.oid],
      name: device.name,
      model: device.model,
    },
  }

  return {
    baseTopic: topic,
    configTopic: topic + '/config',
    stateTopic,
    config,
  }
}
