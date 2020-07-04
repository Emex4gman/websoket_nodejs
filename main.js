const newItem = (content) => {
  const item = document.createElement('div');
  item.innerText = content;
  return item;
};
const messageDiv = document.getElementById('messages')


const socket = io.connect("https://5e050ba54288.ngrok.io");
const coedSOcket = io("https://5e050ba54288.ngrok.io/coed");
coedSOcket.on("coed", (data) => {
  console.log(data, '-from coed');
  // socket.emit("my other event", { my: "dakalkdladladlta" });
});
socket.on("home", (data) => {
  console.log(data);
  // socket.emit("my other event", { my: "dakalkdladladlta" });
});
socket.on("message", (data) => {
  console.log(data);
  messageDiv.appendChild(newItem(data))
  // socket.emit("my other event", { my: "dakalkdladladlta" });
});

const sendMessage = () => {
  socket.emit('message', "web message")
}
const sendMessage2 = () => {
  socket.emit('home', { home: "home" })
}
document.getElementById('sub').addEventListener('click', () => {
  // sendMessage();
  sendMessage();
}); 