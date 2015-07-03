module.exports = function(io) {
  var ds18x20 = require('ds18x20');
  var sensorId = ds18x20.list()[0];

  var temperature;

  var readTemperature = function() {
    ds18x20.get(sensorId, function(err, temp) {
      temperature = temp;
      io.emit('temperature', temperature);
      console.log('Temperature: ' + temperature);
    });
  }

  setInterval(readTemperature, 60 * 1000);
  readTemperature();

  io.on('connection', function(socket) {
    console.log('socket connected');
    socket.emit('temperature', temperature);

    socket.on('disconnect', function() {
      console.log('socket disconnected');
    });
  });
};
