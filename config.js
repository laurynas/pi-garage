require('dotenv').config();

module.exports = function(app) {
  app.set('config.garage_gate_pin', process.env.GARAGE_GATE_PIN || 23);
  app.set('config.garage_gate_button_pin', process.env.GARAGE_GATE_BUTTON_PIN || 24);
  app.set('config.garage_temperature_sensor', process.env.TEMPERATURE_SENSOR || '0000054ca394');
  app.set('config.cozytouch_user', process.env.COZYTOUCH_USER);
  app.set('config.cozytouch_password', process.env.COZYTOUCH_PASSWORD);
};
