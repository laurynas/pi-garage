const client = require('prom-client');

client.collectDefaultMetrics();

const thermometer = new client.Gauge({
  name: 'pigarage_thermometer',
  help: 'Thermometer',
  labelNames: ['location'],
});

const garageGateGauge = new client.Gauge({ name: 'device_garage_gate', help: 'Garage gate state' });
const garageGateCounter = new client.Counter({ name: 'device_garage_gate_counter', help: 'Garage gate button clicks counter' });

module.exports = (app) => {
  app.on('devices:cpu-temperature', value => thermometer.set({ location: 'cpu' }, value));
  app.on('devices:garage-temperature', value => thermometer.set({ location: 'garage' }, value));
  app.on('devices:garage-gate', value => garageGateGauge.set(value));
  app.on('devices:garage-gate:click', () => garageGateCounter.inc());

  app.get('/metrics', (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(client.register.metrics());
  });
};
