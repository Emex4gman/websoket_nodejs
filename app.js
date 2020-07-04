var socket = require('engine.io-client')('ws://5e050ba54288.ngrok.io');
socket.on('open', function () {
  socket.on('message', function (data) { });
  socket.on('close', function () { });
});