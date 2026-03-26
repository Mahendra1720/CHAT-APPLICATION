const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let users = {};

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (username) => {
        users[socket.id] = username;
        socket.broadcast.emit("message", `${username} joined the chat`);
    });

    socket.on("chatMessage", (msg) => {
        const username = users[socket.id];
        io.emit("message", `${username}: ${msg}`);
    });

    socket.on("disconnect", () => {
        const username = users[socket.id];
        if (username) {
            io.emit("message", `${username} left the chat`);
            delete users[socket.id];
        }
        console.log("User disconnected");
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});