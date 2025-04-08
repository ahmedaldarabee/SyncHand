"use client"
import NotesSidebar from '@/components/component/NotesSidebar'
import Header from '@/components/ui/header'
import { Note } from '@/lib/type'
import React, { useState } from 'react'

const NotePage = () => {
  const [notes,setNotes] = useState<Note[]>([]);
  const onNewNote = () => {
    const newNote: Note = {
        id: Math.floor(Math.random() * 1000),
        title:'New Note',
        content:"we will try to build best and modular ui",
        createdAt:Date.now(),
    }
    setNotes([...notes,newNote]);
  }

  return (
    <div className='w-full min-h-screen flex flex-col bg-slate-50 cursor-pointer'>
        <Header onNewNote={onNewNote} />
        <div className='container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='md:col-span-1'>
            <NotesSidebar notes={notes}/>
          </div>
          <div className='md:col-span-2 border border-sky-900'> right</div>
        </div>
    </div>
  )
}

export default NotePage