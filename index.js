const express = require("express");
const app = require("express")();
const _socket = require('socket.io');
const session = require('express-session');
const cors = require('cors');
const ROOMS = {
  COED: "code",
  MALE: 'male',
  FEMALE: 'female',
}
const sessionMiddleware = session({
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

const coEd = io.of('/coed');
const maleRoom = io.of('/male');
const femaleRoom = io.of('/female');

coEd.on('connection', socket => {
  socket.emit('coed', "welcome to code group")
  socket.on("coed", (data) => {
    console.log('coed: ', data);
    coEd.emit("coed", data)
  });
  socket.on("coed.typing", (data) => {
    socket.broadcast.emit('coed.typing', 'someone is typing');
  });
  console.log('someone connected to code');
});

maleRoom.on('connection', socket => {
  socket.emit('male', "welcome to male group")
  socket.on("male", (data) => {
    console.log('male: ', data);
    maleRoom.emit("male", data)
  });
  socket.on("male.typing", (data) => {
    socket.broadcast.emit('male.typing', 'someone is typing');
  });
  console.log('someone connected to male');
});

io.on("connection", (socket) => {
  socket.emit('Welcome Home');
  console.log('made connection to', socket.id);
});

