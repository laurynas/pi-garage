const PromClient = require('prom-client');
const register = PromClient.register;

PromClient.collectDefaultMetrics();

module.exports = (app) => {
  app.get('/metrics', (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(register.metrics());
  });
};
