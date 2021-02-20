const path = require('path');

const express = require('express');
const { isObject } = require('util'); //
const messenger = require('socket.io')();

let users = [];
let index = 0;
let messages = [];



const app = express();


app.use(express.static("public"));

const port = process.env.PORT || 5050;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html")); //localhost:3000/index.html
});

app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "chat.html")); //localhost:3000/index.html
});

const server = app.listen(port, () => {
    console.log(`app is running on ${port}`);
});

//messanger is the connection manager - like a switchboard operator
messenger.attach(server);

// socket is th individual connection - the caller
messenger.on('connection', (socket) => {
    console.log(`a user connected: ${socket.id}`);

    socket.on('newuser', username => {
        console.log(`${username} has arrived,`); //
        socket.username = username; //
        users.push(socket); //

        messenger.emit('userOnline', socket.username);
    });

    socket.on('msg', msg => {
        let message = {
            index: index,
            username: socket.username,
            msg: msg
        }
        messages.push(message);
        messenger.emit('msg', message);

        index++;
    });


    //send the connected user their assigned ID
    socket.emit('connected', { sID: `${socket.id}`, message: 'new connection' });

    socket.emit('loggedIn', {
        users: users.map(s => s.username),
        messages: messages
    });

    socket.on('chatMessage', function(msg) {
        console.log(msg);
        messenger.emit('message', { id: socket.id, message: msg });



    });

    socket.on('disconnect', () => {
        //console.log('a user has disconnected')
        console.log(`${socket.id} has left,`); //
        messenger.emit("userLeft", socket.username);
        users.splice(users.indexOf(socket), 1);
    }); //
});