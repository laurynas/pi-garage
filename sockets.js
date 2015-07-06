module.exports = function(app, io) {
  var ds18x20 = require('ds18x20');
  var gpio = require('pi-gpio');
  var sensorId = ds18x20.list()[0];
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

  function readTemperature() {
    ds18x20.get(sensorId, function(err, temperature) {
      updateStatus('temperature', temperature);
    });
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

  setInterval(readTemperature, 60 * 1000);
  setInterval(readGarageDoorStatus, 300);

  readTemperature();

  io.on('connection', function(socket) {
    console.log('socket connected');
    emitStatus(socket);

    socket.on('disconnect', function() {
      console.log('socket disconnected');
    });

    socket.on('garage_door_button_click', clickGarageDoorButton);
  });
};
