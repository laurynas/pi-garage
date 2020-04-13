const GarageTemperatureSensor = require('./devices/temperature_sensor');
const CPUTemperatureSensor = require('./devices/cpu_temperature_sensor');
const GarageGate = require('./devices/garage_gate');
const Cozytouch = require('./devices/cozytouch');

module.exports = (app) => {
  CPUTemperatureSensor(
    temperature => app.emit('devices:cpu-temperature', temperature)
  );

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

  if (app.get('cozytouch_user')) {
    Cozytouch({
      user: app.get('cozytouch_user'),
      password: app.get('cozytouch_password'),
    }, (state) => {
      console.log(state);
    });
  }
}
