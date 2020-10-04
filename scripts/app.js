// dom queries
const rooms = document.querySelector('.chatrooms');
const newRoomForm = document.querySelector('.new-chat-room');

const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const roomByClass = document.getElementsByClassName('chatrooms');
const roomButtons = roomByClass[0].getElementsByTagName('button');

rooms.addEventListener("click", function(e) {
  for (let button of roomButtons) {
    if (button.classList.contains("active")) {
      if (button.id != e.target.id) {
        button.classList.remove("active");
        e.target.classList.add("active");
      } 
    }
    else {
      e.target.classList.add("active");
    };
  }
})

newRoomForm.addEventListener('submit', e => {
  e.preventDefault();
  const roomName = newRoomForm.message.value.trim();
  rooms.innerHTML+= `<button class="btn btn-light ml-2" id="${roomName}">#${roomName}</button>`
});

// add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  newNameForm.reset();
  updateMssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => updateMssg.innerText = '', 3000);
});

// update the chat room
rooms.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON'){
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
  }
});

// check local storage for name
const username = localStorage.username ? localStorage.username : 'anon';

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('class', username);

// get chats & render
chatroom.getChats(data => chatUI.render(data));
