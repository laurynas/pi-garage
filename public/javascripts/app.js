$(function() {
  var socket = io();

  socket.on('state', function(state) {
    $('#temperature').html(state.garageTemperature);

    if (state.garageGate) {
      $('#garage-gate').removeClass('btn-warning').addClass('btn-success');
      $('#garage-gate .status').html('closed');
    } else {
      $('#garage-gate').removeClass('btn-success').addClass('btn-warning');
      $('#garage-gate .status').html('open');
    }
  });

  $('#garage-gate').click(function() {
    socket.emit('garage_gate_button_click');
  });
});
