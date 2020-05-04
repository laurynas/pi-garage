const config = require('../config');
const device = require('./device');

const id = 'gd1';

const baseTopic = config.mqtt_discovery_prefix + '/cover/' + id;
const configTopic = baseTopic + '/config';
const stateTopic = baseTopic + '/state';
const commandTopic = baseTopic + '/set';

module.exports = (client, app) => {
  app.on('devices:garage-gate', value => {
    const state = value ? 'closed' : 'open';
    client.publish(stateTopic, state, { retain: true });
  });

  client.subscribe(commandTopic);

  client.on('message', (topic, _message) => {
    if (topic == commandTopic) {
      app.emit('devices:garage-gate:click');
    }
  });

  client.publish(configTopic, JSON.stringify({
    unique_id: id,
    device_class: 'garage',
    name: 'Garage gate',
    state_topic: stateTopic,
    command_topic: commandTopic,
    device,
  }), {
    retain: true,
  });
};
