const express = require('express');
const path = require('path');
const messenger = require('socket.io')();
const userSocketIdMap = new Map();




const app = express();

const port = process.env.PORT || 5050;
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html")); //localhost:3000/index.html
});

app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "/chat.html")); //localhost:3000/index.html
});

const server = app.listen(port, () => {
    console.log(`app is running on ${port}`);
});

//messanger is the connection manager - like a switchboard operator
messenger.attach(server);

// function addClientToMap(userName, socketId) {
//     if (!userSocketIdMap.has(userName)) {
//         //when user is joining first time
//         userSocketIdMap.set(userName, new Set([socketId]));
//     } else {
//         //user had already joined from one client and now joining using another
//         client
//         userSocketIdMap.get(userName).add(socketId);
//     }
// }

// function removeClientFromMap(userName, socketId) {
//     if (userSocketIdMap.has(userName)) {
//         let userSocketIdSet = userSocketIdMap.get(userName);
//         userSocketIdSet.delete(socketID);
//         //if there are no clients for a user, remove that user from online
//         list(map)
//         if (userSocketIdSet.size == 0) {
//             userSocketIdMap.delete(userName);
//         }
//     }
// }
// socket is th individual connection - the caller
messenger.on('connection', (socket) => {
    console.log(`a user connected: ${socket.id}`);

    // addClientToMap(userName, socket.id); //


    //send the connected user their assigned ID
    socket.emit('connected', { sID: `${socket.id}`, message: 'new connection' });



    socket.on('chatMessage', function(msg) {
        console.log(msg);
        messenger.emit('message', { id: socket.id, message: msg });



    });

    socket.on('disconnect', () => {
        console.log('a user has disconnected')


    });
});