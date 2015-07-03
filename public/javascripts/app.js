$(function() {
  var socket = io();
  
  socket.on('temperature', function(temperature) {
    $('#temperature').html(temperature);
  });
});
