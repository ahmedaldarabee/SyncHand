"use client"
import NotesSidebar from '@/components/component/NotesSidebar'
import Header from '@/components/ui/header'
import NoteEditor from '@/components/ui/note-editor'
import NoteView from '@/components/ui/note-view'
import { loadNotes, saveNotes } from '@/lib/timestamp'
import { Note } from '@/lib/type'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';

const NotePage = () => {
  const [notes,setNotes] = useState<Note[]>([]);
  const [activeNote,setActiveNote] = useState<Note | null>(null);
  const [isEditting,setIsEditting] = useState<boolean> (false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false); // ✅ جديد

  // first render of page - to show first status of data that be empty!
  useEffect(() => {
    const loadedNotes = loadNotes();
    setNotes(loadedNotes);
    setIsInitialized(true);
    //هيك اشارة انو البيانات تم تحميلها من لوكال ستورج
  }, []);

  useEffect(() => {
    // اذا تم تحميلها قم بأعتماد التحديثات الجديدة الي صارت عليه من جديد 
    if (isInitialized) {
      saveNotes(notes);
    }
  }, [notes, isInitialized]);

  const onNewNote = () => {
    if (!notes) return;

    const newNote: Note = {
        id: Date.now().toString(),
        title:'Note Title...',
        content:"Note Content Here...",
        createdAt:Date.now(),
    }

    // as you see this [last,new] section that used just when i have new data that changed!
    // in localstorage, as you see in useEffect we provide just notes, so in this case the behaviour of system is difference 
    setNotes([...notes,newNote]);
    setActiveNote(newNote);
    setIsEditting(true);

    // Toast Message
  }

  // to define active note
  const onSelectNote = (note:Note) => {
    setActiveNote(note);
    setIsEditting(false);
  }

  const onSave = (updateNote: Note) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        setNotes(notes.map((note) => (note.id === updateNote.id ? updateNote : note)))
        setActiveNote(updateNote);
        setIsEditting(false);
        toast.success('Saved successfully!');
      } else if (result.isDenied) {
        toast.error("Unsaved Note")
      }
    });
  }

  const onCancel = () => {
    Swal.fire({
      title: "Cancel Successfully!",
      icon: "success",
      draggable: true
    });
    setIsEditting(false);
  }

  const renderNoteContent = () => {
    if(activeNote && isEditting){
      return <NoteEditor onCancel={onCancel} onSave={onSave} note={activeNote}/>
    }

    if(activeNote){
      return (
        <NoteView onEdit={() => setIsEditting(true)} note={activeNote}/>
      )
    }

    return null;
  }

  const onDelete = (id: string) => {

    Swal.fire({
      title: "Are you sure?",
      text:  `Do you won't delete this note`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setNotes(notes.filter(note => note.id !== id));
        if(activeNote && activeNote.id === id){
          setActiveNote(null);
          setIsEditting(false);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          // toast ok
        }else{
          // toast No!
        }
      }
    });
  }

  return (
    <div className='w-full min-h-screen flex flex-col bg-slate-50 cursor-pointer'>
        <Header onNewNote={onNewNote} />
        <div className='container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6 flex-1'>
          <div className='md:col-span-1'>
            <NotesSidebar activeNoteId={activeNote?.id} onDelete={onDelete} onNewNote={onNewNote} notes={notes} onSelectNote={onSelectNote}/>
          </div>
          <div className='md:col-span-2'>
            {renderNoteContent()}
          </div>
        </div>
    </div>
  )
}

export default NotePage