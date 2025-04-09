"use client"

import { Note } from '@/lib/type'
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './card'
import { Input } from './input'
import { Textarea } from './textarea'
import { Button } from './button'
import { Save, X } from 'lucide-react'

interface NoteEditorProps {
  note: Note,
  onCancel: () => void,
  onSave: (note: Note) => void
}

const NoteEditor = ({note,onCancel,onSave}: NoteEditorProps) => {
  const [title,setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onSave({
      ...note,
      title: title.trim() || 'Undefined Note!',
      content
    });
  }

  return (
    <Card>

      <CardHeader>
        <Input 
          placeholder='Write here your title'
          value={title} 
          onChange={(event) => setTitle(event.target.value)}
          className='text-xl border-none font-bold px-1 focus-visible:right-0'  />
      </CardHeader>
      
      <CardContent>
        <Textarea
          placeholder='Write your your needed content...'
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className='min-h-[calc(100vh-350px)] resize-none border-none focus-visible:right-0 p-0'
        />
      </CardContent>

      <CardFooter className='flex gap-2 justify-end items-center'>
        
        <Button variant="outline" onClick={onCancel} >
          <X className='w-4 h-4 mr-2' />
          Cancel
        </Button>

        <Button onClick={handleSave} className='bg-sky-500 hover:bg-sky-600'>
            <Save className='w-4 h-4 mr-2'/>
            Save
        </Button>

      </CardFooter>
    </Card>
  )
}

export default NoteEditor