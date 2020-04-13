const client = require('prom-client');
const pigarage = require('./metrics/pigarage');
const cozytouch = require('./metrics/cozytouch');

client.collectDefaultMetrics();

module.exports = (app) => {
  pigarage(client, app);
  cozytouch(client, app);

  app.get('/metrics', (_req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(client.register.metrics());
  });
};
