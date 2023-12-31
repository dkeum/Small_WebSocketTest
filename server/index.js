const express = require("express");
const app = express();
const http = require("http");

const {Server} = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "https://small-web-socket-test-2tvh.vercel.app/",
        methods:["GET","POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("send_message", (data)=>{

        console.log(data)
        // socket.broadcast.emit("receive_message", data)
        socket.to(data.message.room).emit("receive_message", data)
    });

    socket.on("join_room", (data) =>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    })

    socket.on("disconnect", ()=>{
        console.log("User disconnect", socket.id);
    });
}) 

server.listen(3001, () => {
    console.log("Server is Running");
})