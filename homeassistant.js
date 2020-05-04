const mqtt = require('mqtt');
const config = require('./config');
const GarageTemperatureSensor = require('./homeassistant/temperature_sensor');
const GarageGate = require('./homeassistant/garage_gate');
const Cozytouch = require('./homeassistant/cozytouch');

const client = mqtt.connect(`mqtt://${config.mqtt_broker}`, {
  clientId: config.mqtt_client_id,
});

client.on('connect', () => {
  console.log('mqtt connected');
});

module.exports = (app) => {
  GarageTemperatureSensor(client, app);
  GarageGate(client, app);
  Cozytouch(client, app);
};
