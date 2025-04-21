"use client"

import ChatForm from '@/components/component/ChatForm'
import ChatMessage from '@/components/component/ChatMessage';
import React, { useEffect, useState } from 'react'
import { useContextApp } from '../contextApp';
import { Menu } from 'lucide-react';
import toast from 'react-hot-toast';
import {socket} from "@/lib/socketClient";

const ChattingApp = () => {
    const [username,setUsername] = useState("");
    const [room,setRoom] = useState("");
    const [joined,setJoined] = useState<boolean>(false);
    const [messages,setMessages] = useState<{sender: string , message: string}[]>([]);
    

    const messageHandler = (message: string) => {
        const data = {room , message , sender: username};
        setMessages((prev) => [...prev, {sender:username,message}]);
        // emit like a broadcast message
        socket.emit("message",data);
        
    }

    useEffect(() => {
        // these method it will connect with method with the same status on server.ts
        socket.on("message",(data: any) => {
            setMessages((prev) => [...prev, data])
        })

        socket.on("user_joined",(message: any) => {
            setMessages((prev) => [...prev, {sender: "system", message}])
        })

        return () => {
            socket.off("user_joined");
            socket.off("message");
        }
    },[])

    const handleRoomJoining = () => {
        if(username !== "" && room !== ""){
            socket.emit("join-room", {room , username})
            setJoined(true);
        }else{
            toast.error("Enter your name and room name please!")
        }
    }

    const {
        openSideBarObject: { setOpenSideBar },
    } = useContextApp();

    return (
        <div className='w-full min-h-screen flex justify-center'>
            {
                !joined ? (
                    <div  className='flex w-full min-h-screen max-w-3xl flex-col justify-center items-center gap-4'>
                        <div className='flex gap-2'>
                            <h3>Enter room details here</h3>
                            <Menu
                                onClick={() => setOpenSideBar(prev => !prev)}
                                className='text-slate-400 w-6 h-6 cursor-pointer hidden max-[940px]:block'
                            />
                        </div>
                        <input
                            type='text'
                            placeholder='Enter your name'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='w-64 px-4 py-2 mb-4 border-2 border-sky-500 rounded-lg focus:outline-none transition-all cursor-pointer'
                        />
                        <input
                            type='text'
                            placeholder='Enter room name'
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            className='w-64 px-4 py-2 mb-4 border-2 border-sky-500 rounded-lg focus:outline-none transition-all cursor-pointer'
                        />

                        <button
                            onClick={handleRoomJoining}
                            className='px-4 py-2 w-64 text-white text-center bg-sky-500  rounded-lg transition-all cursor-pointer hover:bg-sky-600'
                        >
                            Join Room
                        </button>
                    </div>
                ): (
                    <div className='w-full md:max-w-3xl max-sm:max-w-[80%]'>
                        
                        <div className='flex justify-between items-center gap-2'>
                            <h3 className='mb-2 text-xl font-bold'>Room name: {room}</h3>
                            <Menu
                                onClick={() => setOpenSideBar(prev => !prev)}
                                className='text-slate-400 w-6 h-6 cursor-pointer hidden max-[940px]:block'
                            />
                        </div>
                        
                        <div className='h-[420px] overflow-y-auto p-4 rounded-lg border-2'>
                            {messages.map((msg: any,index: number) => (
                                <ChatMessage
                                    key={index}
                                    sender={msg.sender}
                                    message={msg.message}
                                    isOwnMessage={msg.sender === username}
                                />
                            ))}
                        </div>
                        <ChatForm onSendMessage={messageHandler}/>
                    </div>
                )
            }
        </div>
    )
}

export default ChattingApp