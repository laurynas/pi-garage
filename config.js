require('dotenv').config();

module.exports = {
  garage_gate_pin: process.env.GARAGE_GATE_PIN || 23,
  garage_gate_button_pin: process.env.GARAGE_GATE_BUTTON_PIN || 24,
  garage_temperature_sensor: process.env.TEMPERATURE_SENSOR || '0000054ca394',
  cozytouch_user: process.env.COZYTOUCH_USER,
  cozytouch_password: process.env.COZYTOUCH_PASSWORD,
  mqtt_client_id: process.env.MQTT_CLIENT_ID || 'pi-garage',
  mqtt_broker: process.env.MQTT_BROKER,
  mqtt_discovery_prefix: process.env.MQTT_DISCOVERY_PREFIX || 'homeassistant',
};
