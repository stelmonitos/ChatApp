const express = require('express');
const app = express();
const path = require('path')
const socket = require('socket.io');
app.use(express.static(path.join(__dirname, './client')));


const server = app.listen(8000, () => {
    console.log('Server runs on port 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });
    socket.on('join', (login) => {
        users.push({ name: login, id: socket.id })
        console.log('Oh, I\'ve got something from...');
        socket.broadcast.emit('message', { author: 'ChatBot', content: `<i>${login} joined the chat</i>` });
    });
    socket.on('disconnect', () => {
        console.log('Oh, socket ' + socket.id + ' has left')
        users.splice(users.indexOf(socket.id), 1);
    });
    console.log('I\'ve added a listener on message and disconnect events \n');
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})


const messages = [

];

const users = [
    
];