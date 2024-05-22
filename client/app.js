const socket = io();

// referencje do elementów HTML
const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

// nasłuchiwacz zdarzeń

// globalne zmienne
var userName = '';

// funkcja logowania
const login = (e) => {
    e.preventDefault(); // blokowanie domyślnego zachowania przeglądarki
    userName = userNameInput.value.trim();
    if (userName) {
        // Przełączanie widoczności sekcji
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
        socket.emit('join', userName )
    } else if (userName == '') {
        alert('Please enter your name');
    }
    console.log('loged in as '+ userName);
}
function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message')
    message.classList.add('message--received')
    if (author === userName) {
        message.classList.add('message--self')
    }
    message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You (' + userName + ')' : author}</h3>
    <div class="message__content">
    ${content}
    </div>
    `;
    messagesList.appendChild(message);
}

function sendMessage(e) {
    e.preventDefault();
    
    let messageContent = messageContentInput.value;
    
    if (messageContent.length){
        addMessage(userName, messageContent);
        socket.emit('message', { author: userName, content: messageContent })
        messageContentInput.value = '';
    } else {
        alert('You have to type something!');
    }
}
loginForm.addEventListener('submit', login);
socket.on('message', ({ author, content }) => addMessage(author, content));
addMessageForm.addEventListener('submit', sendMessage);