"use client"
import { useContextApp } from '@/app/pages/contextApp';
import React, { useState } from 'react'

const ChatForm = ({onSendMessage}:{onSendMessage(string): void}) => {
    const [message,setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(message.trim() !== ""){ // This mean if user add message, send it then clear input!
            onSendMessage(message);
            setMessage("");
        }
        const formElement = e.target as HTMLFormElement;
        formElement.reset();
    }

    return (
        <form onSubmit={handleSubmit} className='flex gap-2 mt-4 max-sm:flex-col'>
            <input
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Write here your message...'
                className='flex-1 px-4 border-2 py-2 rounded-lg focus:outline-sky-500 transition-all cursor-pointer'
                />

            <button
                type='submit'
                className='bg-sky-600 cursor-pointer hover:bg-sky-700 px-4 py-2 text-white rounded-lg transition-all'
            >
                Send
            </button>
        </form>
    )
}

export default ChatForm