# Socket.io Tutorial Project

This project is messaging web app that was made by following [Web Dev Simplified's Tutorial on Socket.io](https://www.youtube.com/watch?v=ZKEqqIO7n-k&ab_channel=WebDevSimplified). You can find the [documentation for the Socket.io library here](https://socket.io/docs/v4/).

- [Socket.io](#socketio)
- [Installation](#installation)
    - [Client Installation](#client-installation)
    - [Server Installation](#server-installation)
- [Functionality](#functionality)
    - [Connection](#connection)
    - [Rooms](#rooms)
    - [Admin UI](#admin-ui)

## Socket.io

## Installation

This project requires Node.js to be installed on your machine. If you do not have Node.js installed, you can find the [official Node.js installer here](https://nodejs.org/en/download/). Alternatively, you can install nvm to quickly install and switch between Node.js versions.
 - [Windows nvm repository](https://github.com/coreybutler/nvm-windows)
 - [MacOS/Linux nvm repository](https://github.com/nvm-sh/nvm)

This repository contains both the client and server folders. Each section would have to be installed and run independently.

### Client Installation

1. Navigate to client folder in console: 
> `C:\...\socket.io-tutorial\client>`
1. Install all node modules by inputting an npm install command:
> `npm install`
1. After installation is complete, run the start script:
> `npm run start`
1. A new window should open for localhost:8080 and the client should attempt to connect to the server. Every tab with localhost:8080 open will try to independently connect to the server.

### Server Installation

1. Navigate to server folder in console:
> `C:\...\socket.io-tutorial\client`
1. Install all node modules by inputting an npm install command:
> `npm install`
1. After installation is complete, run the devStart script:
> `npm run devStart`
1. The console should show that nodemon is starting the server. Once a client connects, the server will console log the id of the socket connection.

## Functionality

This messaging web application allows the client to send and receive messages through a server socket connection. The client is able to broadcast to all connected sockets or specific rooms. 

### Connection

The server is first created and listens on a certain port. This is done as the Socket.io library is imported.
```js
const io = require('socket.io')(3000, {
    //Overrides the Cors restriction on connections
    cors: {
        origin: ['http://localhost:8080', 'https://admin.socket.io/'],
    },
})
```
The created socket then has to handle what should happen on the connection. The on() function behaves very similarly to an event listener.
```js
io.on('connection' socket => {
    //Handle connection here
})
```

The client has to import the io function from the socket.io-client. They use the function to attempt a connection to the server. The client can also listen to whether or not the connection succeeded or failed.
```js
//Socket listens for connection error
socket.on( 'connect_error', error => {
    displayMessage(error);
})

//Socket listens for connection success
socket.on( 'connect', () => {
    displayMessage(`You connected with id: ${socket.id}`);
})
```

In order for the client and server to recieve and send data to each other, the .emit() and .on() functions are used. When .emit() is used data is being sent, whereas .on() is listening for events from the connection.

### Rooms

Socket.io has every connection to the server connect with a unique id which corresponds to a particular room. A socket can be made to join a particular room, which is handled server side with the .join() function. This particular project allows the client to input what room they would like to join, but this isn't necessary for every implementation of the Socket.io library.


```js
//Server side code


io.on('connection', socket => {

    //Additional code for each socket connection (listeners, console logs, etc.)

    //Listens for a socket to emit a 'join-room' event
    socket.on('join-room', (room, callback) => {
        //Adds the socket to the room based on what was passed as the room parameter
        socket.join(room);
        //Optional callback to the client. Not necessary to join room
        callback(`Joined ${room}`);
    })
})
```

Sockets are allowed to be in multiple rooms at once. Handling room connections is primarily done in the server.

### Admin UI

The Socket.io Admin UI can be accessed at https://admin.socket.io/. This allows you to view specific details on the connections to the server. The [offical documentation can be found here](https://socket.io/docs/v4/admin-ui/).