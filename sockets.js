module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('socket connected');

    socket.on('disconnect', function() {
      console.log('socket disconnected');
    });
  });
};
