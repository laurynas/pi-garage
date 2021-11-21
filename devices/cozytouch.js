const { Client } = require('overkiz-client');

const Cozytouch = (options, callback) => {
  const client = new Client(console, {
    service: 'cozytouch',
    user: options.user,
    password: options.password,
    pollingPeriod: 0,
    refreshPeriod: 0,
  });

  const update = async () => {
    await client.refreshAllStates();
    const devices = await client.getDevices();

    callback(devices);
  };

  update();
  setInterval(() => update(), 5 * 60 * 1000);
};

module.exports = Cozytouch;
