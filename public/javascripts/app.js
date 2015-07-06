$(function() {
  var socket = io();

  socket.on('status', function(status) {
    $('#temperature').html(status.temperature);

    if (status.garageDoor) {
      $('#garage-door').removeClass('btn-warning').addClass('btn-success');
      $('#garage-door .status').html('closed');
    } else {
      $('#garage-door').removeClass('btn-success').addClass('btn-warning');
      $('#garage-door .status').html('open');
    }
  });

  $('#garage-door').click(function() {
    socket.emit('garage_door_button_click');
  });
});
