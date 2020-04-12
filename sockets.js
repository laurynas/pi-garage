module.exports = function(app, io) {
  const state = {};

  const updateState = (key, value) => {
    state[key] = value;
    console.log(state);
    io.emit('state', state);
  };

  app.on('devices:garage-temperature', temperature => updateState('garageTemperature', temperature));
  app.on('devices:garage-gate', value => updateState('garageGate', value));

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
