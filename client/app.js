// referencje do elementów HTML
const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

// globalne zmienne
var userName = '';

// funkcja logowania
const login = (e) => {
    e.preventDefault(); // blokowanie domyślnego zachowania przeglądarki
    // Tutaj możesz dodać logikę logowania, np. przypisanie wartości z userNameInput do zmiennej userName
    userName = userNameInput.value.trim();
    if (userName) {
        // Przełączanie widoczności sekcji
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    } else if( userName == '' ){
        alert('Please enter your name');
    }
    console.log('login')
}

function addMessage (author, content) {
    const message = document.createElement('li');
    message.classList.add('message')
    message.classList.add('message--received')
    if(author === userName){
        message.classList.add('message--self')
    }
    message.innerHTML=`
        <h3 class="message__author">${userName === author ? 'You' : author}</h3>
        <div class="message__content">
            ${content}
        </div>
    `;
    messagesList.appendChild(message);
}

function sendMessage(e) {
    e.preventDefault();
    let message = messageContentInput.value.trim();
    if(message == ''){
        alert('Please enter a message');
    } else {
        addMessage(userName, messageContentInput.value);
        messageContentInput.value = '';
    }
}

// nasłuchiwacz zdarzeń
loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage)
