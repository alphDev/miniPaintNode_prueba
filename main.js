const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

// init 
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// sockets
require('./sockets')(io)

// middlewares
app.use("/", express.static(__dirname + "/public"))


// config

// start
server.listen(3000, console.log("Servidor encendido puerto 3000"));


 app.get("/", async (req, res) => {
     res.sendFile('/index.html')
 })