module.exports = function(app, io) {
  const state = {};

  const emitState = (socket) => socket.emit('state', state);

  const updateState = (key, value) => {
    state[key] = value;
    emitState(io);
    console.log(state);
  };

  app.on('devices:garage-temperature', temperature => updateState('garageTemperature', temperature));
  app.on('devices:garage-gate', value => updateState('garageGate', value));

  io.on('connection', function(socket) {
    console.log('socket connected');
    emitState(socket);

    socket.on('disconnect', function() {
      console.log('socket disconnected');
    });

    socket.on('garage_gate_button_click', function() {
      console.log('garage gate button clicked');
      app.emit('devices:garage-gate:click');
    });
  });
};
