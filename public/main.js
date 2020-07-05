const socket = io.connect("ws://75549139934d.ngrok.io?token=123&api=hsajsjasjsaj");
const newItem = (content) => {
  const item = document.createElement('div');
  item.innerText = content;
  return item;
};
const messageDiv = document.getElementById('messages')
const codemessagesDiv = document.getElementById('codemessages')

// const option = {
//   transports: [/*'websocket',*/ 'polling'],
//   query: { kliii: 'dsdsdsdsdsd' },
//   transportOptions: {
//     extraHeaders: {
//       'Authorization': 'abc'
//     },
//     polling: {
//       // extraHeaders: {
//       //   'Authorization': 'abc'
//       // } 
//     }
//   }https://75549139934d.ngrok.io
// }
var authToken = 'R3YKZFKBVi';

document.cookie = 'X-Authorization=' + authToken + '; path=/';

let coedSOcket;

socket.on("home", (data) => {
  console.log(data);
});

socket.on("message", (data) => {
  console.log(data);
  messageDiv.appendChild(newItem(data))
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

if (coedSOcket) {
  coedSOcket.on("coed", (data) => {
    console.log(data, '-from coed');
    codemessagesDiv.appendChild(newItem(data))
    // socket.emit("my other event", { my: "dakalkdladladlta" });
  });

}
document.getElementById('coed').addEventListener('click', () => {
  if (coedSOcket) {
    coedSOcket.emit('coed', { coed: "coed" })
    coedSOcket.on("coed", (data) => {
      console.log(data, '-from coed');
      codemessagesDiv.appendChild(newItem(data))
      // socket.emit("my other event", { my: "dakalkdladladlta" });
    });
  }

  if (!coedSOcket) {
    coedSOcket = io.connect("https://75549139934d.ngrok.io/coed?token=123&api=codeapi");
    coedSOcket.on("coed", (data) => {
      console.log(data, '-from coed');
      codemessagesDiv.appendChild(newItem(data))
      // socket.emit("my other event", { my: "dakalkdladladlta" });
    });
  }

}); 