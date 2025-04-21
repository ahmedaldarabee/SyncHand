// @ts-check

import { createServer } from "node:http";
import next from "next"
import {Server} from "socket.io"
import { create } from "node:domain";

const dev = process.env.NODE_ENV != "production"; // development production or hosting production or another?
const hostname = process.env.HOSTNAME || "localhost"; // define hosting name 
const port = parseInt(process.env.PORT || "3000",10); // 10 decimal - use 3000 or another port

const app = next({dev,hostname,port}); // start next configuration
const handle = app.getRequestHandler();// handle any requests not sockets

app.prepare().then(() => {
    const httpServer = createServer(handle); // build server that worked on next js
    const io = new Server(httpServer); // socket server and linked with httpServer to listen about any changes

    // on -> refer connection running
    // off -> refer connection stop!
    io.on("connection",(socket) => {
        console.log(`User that connected:  ${socket.id}`);// print user id when do connection...
        
        // both:  join-room and user_joined constant names in socket library 

        // join-room: user send request to enter room
        // Client -> Server

        socket.on("join-room",({room , username}) => {
            // register users section
            socket.join(room);
            console.log(`user ${username} joined room ${room}`);
            
            // provide bi-direction communication messages
            // user_joined: see to all exists users: we have new user that be: username!
            // notification message.
            socket.to(room).emit("user_joined", `${username} joined room`);
        });

        // handle bi-directional messages section
        socket.on("message",({message, room, sender}) => {
            console.log(`Message from ${sender} in room ${room}: ${message}`)
            
            // emit refer to: know to socket about current event about what's happening and data that exist 
            // like: say to socket about new event like new message that sended and this message it will be visible to all current / exist users
            socket.to(room).emit("message",{ sender,message});
        })

        socket.on("disconnect",()=> {
            console.log(`User that disconnected:  ${socket.id}`);// print user id when do dis-connection
        })
    })

    httpServer.listen(port,() => { // founding any new changes and do it!
        console.log(`Server running on http://${hostname}:${port}`); // server running
    })
})