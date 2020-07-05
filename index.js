const express = require("express");
const app = require("express")();
const _socket = require('socket.io');
const session = require('express-session');
var cors = require('cors')
const ROOMS = {
  COED: "/code",
  MALE: '/male',
  FEMALE: '/female',
  TRANS: "/transgenger"
}
var sessionMiddleware = session({
  secret: "keyboard cat",
  saveUninitialized: true,
  resave: false
});

// app.use()
app.use(cors())

app.use(sessionMiddleware);
// WARNING: app.listen(80) will NOT work here!
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
const server = app.listen(2000, function (req, res) {
  console.log("Server on", 2000);
});



const io = _socket(server)
io.use(function (socket, next) {
  socket.request.userId = 1000;
  next()
  // sessionMiddleware(socket.request, socket.request.res, next);
});
// middleware
const isValid = (token) => {
  if (token == '123') {
    return true
  } else {
    return false
  }
}
io.use((socket, next) => {
  let token = socket.handshake.query.token;
  console.log(socket.handshake.query)
  if (isValid(token)) {
    console.log('success')
    return next();
  }
  console.log('failed')
  return next(new Error('authentication error'));
});

const nsp = io.of('/coed');
nsp.on('connection', socket => {
  socket.emit('coed', "welcome to code group")
  socket.on("coed", (data) => {
    console.log('coed: ', data);
    io.sockets.emit("coed", data)
  });
  console.log('someone connected to code');

});

io.on("connection", (socket) => {
  socket.emit("home", 'home connect');
  console.log('made connection to', socket.id);
  socket.on("message", (data) => {
    console.log('message: ', data);
    io.sockets.emit("message", data)
  });
  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', 'someone is typing');
  });
});

