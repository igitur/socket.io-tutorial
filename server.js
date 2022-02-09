const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:8080', 'http://localhost:8081'],
    },
})

io.on('connection', socket => {
    console.log(socket.id)
    socket.on('send-message', (message, room) => {
        // io.emit('recieve-message', message); //server emmits message to every connection
        if (room === ''){
            socket.broadcast.emit('recieve-message', message);  //socket broadcasts on every socket that isn't itself
        } else {
            //private message based on room id
            socket.to(room).emit('recieve-message', message);
        }
    })

    socket.on('join-room', (room, callback) => {
        socket.join(room);
        callback(`Joined ${room}`);
    })
})