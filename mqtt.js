const os = require('os');
const mqtt = require('mqtt');
const config = require('./config');

const prefix = config.mqtt_discovery_prefix;

const door = {
  id: 'gd1',
  name: 'Garage gate',
  device_class: 'garage',
};

const t1 = {
  id: 't1',
  name: 'Garage',
  device_class: 'temperature',
};

const gd1BaseTopic = prefix + '/cover/' + door.id;
const gd1ConfigTopic = gd1BaseTopic + '/config';
const gd1CommandTopic = gd1BaseTopic + '/set';
const gd1StateTopic = gd1BaseTopic + '/state';

const t1BaseTopic = prefix + '/sensor/' + t1.id;
const t1ConfigTopic = t1BaseTopic + '/config';
const t1StateTopic = t1BaseTopic + '/state';

const device = {
  name: 'pi-garage',
  connections: [['mac', os.networkInterfaces().eth0[0].mac]],
};

module.exports = (app) => {
  const client = mqtt.connect(`mqtt://${config.mqtt_broker}`, { 
    clientId: config.mqtt_client_id,
  });

  client.on('connect', () => {
    console.log('mqtt connected');
  });

  client.subscribe(gd1CommandTopic);

  client.on('message', (topic, message) => {
    console.log("Got mqtt message: %s %s", topic, message);
    
    switch(topic) {
      case gd1CommandTopic:
        app.emit('devices:garage-gate:click');
        break;
    }
  });

  app.on('devices:garage-gate', value => {
    const state = value ? 'closed' : 'open';
    client.publish(gd1StateTopic, state, { retain: true });
  });

  app.on('devices:garage-temperature', value => {
    client.publish(t1StateTopic, value.toString(), { retain: true });
  });

  client.publish(gd1ConfigTopic, JSON.stringify({
    unique_id: door.id,
    device_class: door.device_class,
    name: door.name,
    command_topic: gd1CommandTopic,
    state_topic: gd1StateTopic,
    device,
  }), {
    retain: true,
  });

  client.publish(t1ConfigTopic, JSON.stringify({
    unique_id: t1.id,
    device_class: t1.device_class,
    name: t1.name,
    state_topic: t1StateTopic,
    unit_of_measurement: '°C',
    value_template: '{{ value | float }}',
    device,
  }), {
    retain: true,
  });
};
