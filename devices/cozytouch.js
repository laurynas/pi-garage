const { Client } = require('overkiz-client');

const Cozytouch = async (options, callback) => {
  const client = new Client(console, {
    service: 'cozytouch',
    user: options.user,
    password: options.password,
    refreshPeriod: 10,
  });

  const devices = await client.getDevices();

  devices.forEach(device => {
    device.on('states', (_states) => callback(device));
  });

  await client.refreshAllStates();
};

module.exports = Cozytouch;
