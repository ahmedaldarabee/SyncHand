// socketClient.ts
"use client"

import { io, Socket } from "socket.io-client";

// about local host, but once you deploy you app, use it link!
// export const socket: Socket = io("https://synchand.onrender.com/");
export const socket: Socket = io("http://localhost:3000/"); // local host link
//change by mohammad hilal - as a example
