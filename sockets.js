const lodash = require('lodash');

module.exports = function(app, io) {
  let state = {};

  const updateState = (updates) => {
    state = { ...state, ...updates };
    console.log(state);
    io.emit('state', state);
  };

  const updateTemperature = (device, oid, attribute) => {
    const temperature = findTemperature(device, oid);
    temperature && updateState({ [attribute]: temperature });
  }

  app.on('devices:garage-temperature', value => updateState({ garageTemperature: value }));
  app.on('devices:garage-gate', value => updateState({ garageGate: value }));
  app.on('devices:cozytouch', device => updateTemperature(device, '1268a0bd-70ff-4a91-98a6-2b5a51fb99ba', 'salonTemperature'));
  app.on('devices:cozytouch', device => updateTemperature(device, '2b9d7259-8d05-4179-a7ff-aa09a56c31fc', 'outsideTemperature'));

  io.on('connection', function(socket) {
    console.log('socket connected');
    socket.emit('state', state);

    socket.on('disconnect', function() {
      console.log('socket disconnected');
    });

    socket.on('garage_gate_button_click', function() {
      console.log('garage gate button clicked');
      app.emit('devices:garage-gate:click');
    });
  });
};

const findTemperature = (device, oid) => {
  const deviceAndSensors = [device].concat(device.sensors);
  const devices = deviceAndSensors.filter(device => device.oid == oid);
  const states = lodash.flatMap(devices.map(device => device.states));

  return states
    .filter(state => state.name == 'core:TemperatureState')
    .map(state => state.value)
    .pop();
};
