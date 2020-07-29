const socket = io.connect("https://d3ddc88e1607.ngrok.io?token=123&api=hsajsjasjsaj");
const newItem = (content) => {
  const item = document.createElement('div');
  item.innerText = content;
  return item;
};
const messageDiv = document.getElementById('messages')
const codemessagesDiv = document.getElementById('codemessages')
const inpute = document.getElementById("inputemessage")
const inpute2 = document.getElementById("inputemessage2")
const sendBtn = document.getElementById("send")
const sendBtn2 = document.getElementById("send2")

let coedSOcket;
let maleSOcket;

socket.on("home", (data) => {
  console.log(data);
  messageDiv.appendChild(newItem(data))

});

socket.on("message", (data) => {
  console.log(data);
  messageDiv.appendChild(newItem(data))
});


// const sendMessage = () => {
//   socket.emit('home', "web message")
// }
sendBtn.addEventListener('click', function () {
  coedSOcket.emit("coed", inpute.value)
})
sendBtn2.addEventListener('click', function () {
  maleSOcket.emit("male", inpute2.value)
})
// document.getElementById('sub').addEventListener('click', () => {
//   sendMessage();
// });

document.getElementById('male').addEventListener('click', () => {
  if (!maleSOcket) {
    maleSOcket = io("https://d3ddc88e1607.ngrok.io/male");
  }
  maleSOcket.on("male", (data) => {
    console.log(data, '-from coed');
    messageDiv.appendChild(newItem(data))
  });
});

document.getElementById('coed').addEventListener('click', () => {
  if (!coedSOcket) {
    coedSOcket = io("https://d3ddc88e1607.ngrok.io/coed");
  }
  coedSOcket.on("coed", (data) => {
    console.log(data, '-from coed');
    codemessagesDiv.appendChild(newItem(data))
  });
}); 