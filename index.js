const express = require("express");
const app = require("express")();
const _socket = require('socket.io');
const session = require('express-session');

var sessionMiddleware = session({
  secret: "keyboard cat",
  saveUninitialized: true,
  resave: false
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(sessionMiddleware);
// WARNING: app.listen(80) will NOT work here!
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
const server = app.listen(2000, function (req, res) {
  console.log("Server on", 2000);
});


const io = _socket(server)

io.use(function (socket, next) {
  sessionMiddleware(socket.request, socket.request.res, next);
});

// const nsp = io.of('/coed');
// nsp.on('connection', socket => {
//   socket.emit('coed', "welcome to code group")
//   console.log('someone connected', socket.request.user);
// });

io.on("connection", (socket) => {
  var req = socket.request;

  socket.emit('mecome to my app');
  socket.emit("home", {
    welcome: "home connect",
  });
  console.log('made connectin', socket.id);
  socket.on("message", (data) => {
    console.log('message');
    console.log(data);
    io.sockets.emit("message", data)
  });
});

