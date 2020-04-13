const GarageTemperatureSensor = require('./devices/temperature_sensor');
const GarageGate = require('./devices/garage_gate');

module.exports = (app) => {
  GarageTemperatureSensor(
    app.get('garage_temperature_sensor'),
    temperature => app.emit('devices:garage-temperature', temperature),
  );

  const garageGate = GarageGate({
    pin: app.get('garage_gate_pin'),
    buttonPin: app.get('garage_gate_button_pin'),
    onChange: value => app.emit('devices:garage-gate', value),
  });

  app.on('devices:garage-gate:click', () => garageGate.click());
}
