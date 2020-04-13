const lodash = require('lodash');

module.exports = (client, app) => {
  const registry = {}

  const fetchGauge = (state) => {
    if (!registry[state.name]) {
      registry[state.name] = buildGauge(state);
    }

    return registry[state.name];
  }

  const buildGauge = (state) => {
    const name = lodash.snakeCase(state.name);
    console.log(state);
    console.log(name);
  }

  app.on('devices:cozytouch', setup => {
    setup.devices.forEach(device => {
      device.states.forEach(state => {
        const gauge = fetchGauge(state);
      });
    });
  });
}
