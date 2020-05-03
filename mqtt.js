const mqtt = require('mqtt');
const config = require('./config');

const prefix = config.mqtt_discovery_prefix;

const door = {
  id: 'gd1',
  name: 'Garage gate',
};

const baseTopic = prefix + '/cover/' + door.id;
const configTopic = baseTopic + '/config';
const commandTopic = baseTopic + '/set';
const stateTopic = baseTopic + '/state';

module.exports = (app) => {
  const client = mqtt.connect(`mqtt://${config.mqtt_broker}`, { 
    clientId: config.mqtt_client_id,
  });

  client.on('connect', () => {
    console.log('mqtt connected');
  });

  client.subscribe(commandTopic);

  client.on('message', (topic, message) => {
    console.log("Got mqtt message: %s %s", topic, message);
    
    switch(topic) {
      case commandTopic:
        app.emit('devices:garage-gate:click');
        break;
    }
  });

  app.on('devices:garage-gate', value => {
    const state = value ? 'closed' : 'open';
    client.publish(stateTopic, state, { retain: true });
  });

  client.publish(configTopic, JSON.stringify({
    name: door.name,
    command_topic: commandTopic,
    state_topic: stateTopic,
  }), {
    retain: true,
  });
};
