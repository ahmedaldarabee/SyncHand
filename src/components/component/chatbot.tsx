"use client"

import Markdown from 'react-markdown'
import { useChat } from '@ai-sdk/react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Bot, SendIcon, Square } from "lucide-react"
import Image from 'next/image'

export function Chatbot() {
  const {messages,input,handleInputChange,handleSubmit , isLoading , stop} = useChat({
    api:"/api/chat"
  })

  return (
    <div className="bg-slate-50 flex flex-col h-full max-h-[800vh] w-full max-w-[672px] mx-auto bg-background rounded-lg">
      <div className="flex-1 overflow-auto p-6">
        {messages.length === 0 && (
          <div className='flex flex-col justify-center items-center h-full cursor-pointer'>
            <p className='text-lg text-muted-foreground mt-4'>Welcome to synchand ai chatbot! ask me any thing...</p>
            <Image src="/SyncHand.png" alt='SyncHand Logo' width={280} height={280} />
          </div>
        )}

        <div className="flex flex-col gap-4">

          {
            messages.map((message: any) =>               
              message.role === "assistant" ? (

                <div key={message.id} className="flex items-start gap-3">
                  <div className="p-2 border border-gray-700 rounded-full">
                    <Bot className="size-5 text-primary" />
                  </div>
                  <div className="bg-muted rounded-lg p-3 max-w-[70%]">
                    <Markdown
                    components={{
                      p: ({ children }) => <p className="text-sm text-muted-foreground">{children}</p>,
                    }}>{message.content}</Markdown>
                  </div>
              </div>

              ) : (
                <div key={message.id} className="flex justify-end">
                  <div className="bg-primary rounded-lg p-3 max-w-[70%]">
                    <p className="text-sm text-primary-foreground"> {message.content} </p>
                  </div>
                </div>
              )
            )
          }
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-muted/50 px-4 py-3 flex items-center gap-2">
        <div className="relative flex-1">
          <Textarea
            placeholder="Ask sycnhand ai..."
            className="rounded-lg border pr-12 min-h-[64px] resize-none"
            rows={2}
            value={input}
            onChange={handleInputChange}
          />
          {!isLoading ? (
            <>
            <Button
              disabled={!input || isLoading} 
              type="submit"
              size="icon" 
              className="absolute bottom-3 right-3 rounded-full cursor-pointer">
              <SendIcon className="w-5 h-5 cursor-pointer" />
              </Button>
            </>
          ) : (
            <>
            <Button
              disabled={!isLoading} 
              type="button"
              onClick={stop}
              size="icon"
              className="absolute bottom-3 right-3 rounded-full cursor-pointer">
              <Square className="w-5 h-5 cursor-pointer" fill='white' />
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  )
}