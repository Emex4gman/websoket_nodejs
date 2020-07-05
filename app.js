var socket = require('engine.io-client')('ws://localhost');
socket.on('open', function () {
  socket.on('message', function (data) { });
  socket.on('close', function () { });
});
