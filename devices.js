const config = require('./config');

const GarageTemperatureSensor = require('./devices/temperature_sensor');
const CPUTemperatureSensor = require('./devices/cpu_temperature_sensor');
const GarageGate = require('./devices/garage_gate');
const Cozytouch = require('./devices/cozytouch');

module.exports = (app) => {
  CPUTemperatureSensor(
    temperature => app.emit('devices:cpu-temperature', temperature)
  );

  if (config.garage_temperature_sensor) {
    GarageTemperatureSensor(
      config.garage_temperature_sensor,
      temperature => app.emit('devices:garage-temperature', temperature),
    );
  }

  if (config.garage_gate_pin) {
    const garageGate = GarageGate({
      pin: config.garage_gate_pin,
      buttonPin: config.garage_gate_button_pin,
      onChange: value => app.emit('devices:garage-gate', value),
    });

    app.on('devices:garage-gate:click', () => garageGate.click());
  }

  if (config.cozytouch_user) {
    Cozytouch({
      user: config.cozytouch_user,
      password: config.cozytouch_password,
    }, (state) => {
      console.log(state);
    });
  }
}
