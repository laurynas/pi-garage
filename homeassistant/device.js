const config = require('../config');

module.exports = {
  name: config.mqtt_client_id,
  identifiers: [config.mqtt_client_id],
};
