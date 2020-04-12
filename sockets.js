module.exports = function(app, io) {
  var state = {};

  function emitState(socket) {
    socket.emit('state', state);
  };

  function updateState(key, value) {
    state[key] = value;
    emitState(io);
    console.log(state);
  };

  app.on('devices:garage-temperature', temperature => updateState(temperature));


  var garageGate = require('./devices/garage_gate')({
    pin: app.get('garage_gate_pin'),
    buttonPin: app.get('garage_gate_button_pin'),
    onChange: function(value) {
      updateStatus('garageGate', value);
    }
  });

  io.on('connection', function(socket) {
    console.log('socket connected');
    emitState(socket);

    socket.on('disconnect', function() {
      console.log('socket disconnected');
    });

    socket.on('garage_gate_button_click', function() {
      console.log('garage gate button clicked');
      garageGate.click();
    });
  });
};
