module.exports = function(app, io) {
  var status = {
    temperature: null,
    garageGate: null
  };

  function emitStatus(socket) {
    socket.emit('status', status);
  };

  function updateStatus(key, value) {
    status[key] = value;
    emitStatus(io);
    console.log(status);
  };

  require('./libraries/temperature_sensor')(function(temperature) {
    updateStatus('garageTemperature', temperature);
  });

  var garageGate = require('./libraries/garage_gate')({
    pin: app.get('garage_gate_pin'),
    buttonPin: app.get('garage_gate_button_pin'),
    onChange: function(value) {
      updateStatus('garageGate', value);
    }
  });

  io.on('connection', function(socket) {
    console.log('socket connected');
    emitStatus(socket);

    socket.on('disconnect', function() {
      console.log('socket disconnected');
    });

    socket.on('garage_gate_button_click', function() {
      console.log('garage gate button clicked');
      garageGate.click();
    });
  });
};
