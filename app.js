const express = require('express');
const path = require('path');

const messenger = require('socket.io')();

const app = express();

app.use(express.static("public"));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html")); //localhost:3000/index.html
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

    socket.on('disconnect', () => {
        console.log('a user has disconnected')
    })
});