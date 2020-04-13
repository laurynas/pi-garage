const client = require('prom-client');

client.collectDefaultMetrics();

const thermometer = new client.Gauge({
  name: 'pigarage_thermometer',
  help: 'Thermometer',
  labelNames: ['location'],
});

const opening = new client.Gauge({
  name: 'pigarage_opening',
  help: 'Door, window state (1 - closed, 0 - open)',
  labelNames: ['location'],
});

const clickCounter = new client.Counter({
  name: 'pigarage_click_counter',
  help: 'Click counter',
  labelNames: ['location'],
});

module.exports = (app) => {
  app.on('devices:cpu-temperature', value => thermometer.set({ location: 'cpu' }, value));
  app.on('devices:garage-temperature', value => thermometer.set({ location: 'garage' }, value));
  app.on('devices:garage-gate', value => opening.set({ location: 'garage_gate' }, value));
  app.on('devices:garage-gate:click', () => clickCounter.inc({ location: 'garage_gate' }));

  app.get('/metrics', (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(client.register.metrics());
  });
};
