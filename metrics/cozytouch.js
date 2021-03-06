const lodash = require('lodash');

const PREFIX = 'cozytouch';

module.exports = (client, app) => {
  const REGISTRY = {}

  app.on('devices:cozytouch', setup => {
    setup.devices.forEach(device => {
      (device.states || []).forEach(state => {
        handleState(device, state);
      });
    });
  });

  const handleState = (device, state) => {
    if (state.type > 3) {
      return;
    }

    const labels = {
      name: device.name,
      model: device.model,
      widget: device.widget,
      uiClass: device.uiClass,
      oid: device.oid,
      placeOID: device.placeOID,
      url: device.URL,
    }

    let value = state.value;

    if (state.type == 3) {
      labels.value = value;
      value = 1;
    }

    fetchGauge(state).set(labels, value);
  }

  const fetchGauge = (state) => {
    if (!REGISTRY[state.name]) {
      REGISTRY[state.name] = buildGauge(state);
    }

    return REGISTRY[state.name];
  }

  const buildGauge = (state) => {
    const name = PREFIX + '_' + lodash.snakeCase(state.name);
    const labelNames = ['name', 'model', 'widget', 'uiClass', 'oid', 'placeOID', 'url'];

    if (state.type == 3) {
      labelNames.push('value');
    }

    return new client.Gauge({
      name,
      labelNames,
      help: state.name,
    });
  }
}
