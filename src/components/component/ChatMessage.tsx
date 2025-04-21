"use client"
import { useContextApp } from '@/app/pages/contextApp';
import { Pencil } from 'lucide-react';
import React, { useState } from 'react'

interface ChatMessageProps {
    sender: string;
    message: string;
    isOwnMessage: boolean
}

const ChatMessage = ({sender,message,isOwnMessage}:ChatMessageProps) => {
    // isSystemMessage = sender === "system" refer:
    // this represent message from system or not, so if be from system maybe as:
    // notifications about user enter or out from this chat or sender user -> MY
    const isSystemMessage = sender === "system";
 
    // justify-center: that be as notification.
    // justify-end : that be another user not my!
    // justify-start : that be my!

    return (
        <div className={`flex ${isSystemMessage ? "justify-center" : isOwnMessage ? "justify-end" : "justify-start"} mb-3`}>
            <div className={`max-w-xs px-4 py-2  ${isSystemMessage ? "bg-gray-800 text-white text-center text-xs rounded-full" : isOwnMessage ? "bg-sky-600 text-white rounded-l-lg":"bg-slate-200 rounded-b-lg text-black" }`}>
                {/* this line refer if sender not ahmed (MY) - Owner don't show own name but if be another user show it */}
                {
                    !isSystemMessage && 
                    <div className='flex gap-1'>
                        <p className='text-sm font-bold'>{sender}</p>
                        <Pencil className={`w-4 h-4 cursor-pointer text-white ${isOwnMessage ? "" :"hidden"}`}/>
                    </div>
                }
                <p>{message}</p>
            </div>
        </div>
    )

    // Now, the main question, how can be know these think?
}

export default ChatMessage