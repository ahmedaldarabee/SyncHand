"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const next_1 = __importDefault(require("next"));
const socket_io_1 = require("socket.io");
const dev = process.env.NODE_ENV != "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);
const app = (0, next_1.default)({ dev, hostname, port });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    const httpServer = (0, node_http_1.createServer)(handle);
    const io = new socket_io_1.Server(httpServer);
    io.on("connection", (socket) => {
        console.log(`User that connected:  ${socket.id}`);
        socket.on("join-room", ({ room, username }) => {
            socket.join(room);
            console.log(`user ${username} joined room ${room}`);
            socket.to(room).emit("user_joined", `${username} joined room`);
        });
        socket.on("message", ({ message, room, sender }) => {
            console.log(`Message from ${sender} in room ${room}: ${message}`);
            socket.to(room).emit("message", { sender, message });
        });
        socket.on("disconnect", () => {
            console.log(`User that disconnected:  ${socket.id}`);
        });
    });
    httpServer.listen(port, () => {
        console.log(`Server running on http://${hostname}:${port}`);
    });
});
//# sourceMappingURL=server.js.map