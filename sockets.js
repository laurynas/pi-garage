module.exports = function(app, io) {
  let state = {};

  const updateState = (updates) => {
    state = { ...state, ...updates };
    console.log(state);
    io.emit('state', state);
  };

  app.on('devices:garage-temperature', value => updateState({ garageTemperature: value }));
  app.on('devices:garage-gate', value => updateState({ garageGate: value }));

  app.on('devices:cozytouch', result => {
    updateState({
      salonTemperature: findTemperature(result, '1268a0bd-70ff-4a91-98a6-2b5a51fb99ba'),
      outsideTemperature: findTemperature(result, '2b9d7259-8d05-4179-a7ff-aa09a56c31fc'),
    });
  });

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

const findTemperature = (cozytouchResult, oid) => (
  cozytouchResult
    .devices
    .filter(device => device.oid == oid)
    .flatMap(device => device.states)
    .filter(state => state.name == 'core:TemperatureState')
    .map(state => state.value)
    .pop()
);
