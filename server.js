
//connect to admin view @ admin.socket.io and serverurl = "http://localhost:3000/admin"
const { instrument } = require('@socket.io/admin-ui')
const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:8080', 'https://admin.socket.io/'],
    },
})

//Socket connection using namespaces
const userIo = io.of('/user')
userIo.on('connection', socket => {
    console.log("Connected to user namespace with username" + socket.username);
})

userIo.use((socket, next) => {
    if (socket.handshake.auth.token) {
        // socket.username = getUsernameFromToken(socket.handshake.auth.token); //this line was causing server to continuously shut down
        next();
    } else {
        next(new Error("Please send token"));
    }
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
    socket.on('ping', n => console.log(n))
})

instrument(io, { auth: false })