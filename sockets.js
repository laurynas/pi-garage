module.exports = function(app, io) {
  var gpio = require('pi-gpio');
  var garageDoorPin = app.get('garage_door_pin');
  var garageDoorButtonPin = app.get('garage_door_button_pin');

  var status = {
    temperature: null,
    garageDoor: null
  };

  function emitStatus(socket) {
    socket.emit('status', status);
  };

  function updateStatus(key, value) {
    if (status[key] == value)
      return;

    status[key] = value;

    emitStatus(io);
    console.log(status);
  };

  function readGarageDoorStatus() {
    gpio.read(garageDoorPin, function(err, value) {
      updateStatus('garageDoor', value);
    });
  }

  function clickGarageDoorButton() {
    console.log('Click garage door');

    gpio.open(garageDoorButtonPin, function(err) {
      gpio.write(garageDoorButtonPin, 1, function() {
        setTimeout(function() {
          gpio.write(garageDoorButtonPin, 0, function() {
            gpio.close(garageDoorButtonPin);
          });
        }, 100);
      });
    });
  }

  gpio.open(garageDoorPin, 'input');

  setInterval(readGarageDoorStatus, 300);

  require('./libraries/temperature_sensor')(function(temperature) {
    updateStatus('temperature', temperature);
  });

  io.on('connection', function(socket) {
    console.log('socket connected');
    emitStatus(socket);

    socket.on('disconnect', function() {
      console.log('socket disconnected');
    });

    socket.on('garage_door_button_click', clickGarageDoorButton);
  });
};
