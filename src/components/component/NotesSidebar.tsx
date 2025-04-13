import React from 'react'
import { Card,CardContent,CardHeader,CardTitle,} from "@/components/ui/card"
// import EmptyScreen from '../ui/empty-statate';
import { Note } from '@/lib/type';
import { Trash2 } from 'lucide-react';
import { formatingDate } from '@/lib/timestamp';
import { Button } from '../ui/button';
import ProjectsEmptyScreen from '@/app/EmptyScreen/ProjectsEmptyScreen';

interface NoteProps {
    notes: Note[],
    onSelectNote: (note: Note) => void,
    onNewNote: () => void,
    onDelete: (id: string) => void,
    activeNoteId: string | undefined
}

const NotesSidebar = ({notes,onSelectNote,onNewNote,onDelete,activeNoteId}:NoteProps) => {

    const dataHandler = (data: string) => {
        const mainTitle = data.substring(0,30);
        const titleLength = data.length > 40 ? "..." : "";
        return mainTitle + titleLength;
    }

    return (
        <>
            <Card className='h-full bg-slate-50 border-none'>
                <CardContent className='overflow-auto projects-bar w-full h-[400px]'>
                    {
                        notes.length === 0 ? (
                        <ProjectsEmptyScreen />
                        ) : (
                            <div>
                                {
                                    notes.map((note: Note) => (
                                        <div onClick={() => onSelectNote(note)} key={note.id} 
                                        className={`p-2 rounded-md cursor-pointer hover:bg-accent transition-all ${activeNoteId === note.id ? "bg-accent":""} border border-slate-500 my-2`}>
                                            <div className='flex justify-between items-center gap-2'>
                                                <div>
                                                    <h1 className='text-[22px] font-medium'>
                                                        {dataHandler(note.title)}
                                                    </h1>
                                                    <p className='text-[18px] text-muted-foreground'>
                                                        {dataHandler(note.content)}
                                                    </p>
                                                    <p className='text-[14px] text-muted-foreground'>
                                                        {formatingDate(note.createdAt)}
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className='w-8 h-8 text-muted-foreground hover:text-destructive cursor-pointer'
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        onDelete(note.id);
                                                    }}
                                                >
                                                    <Trash2 className='w-4 h-4 hover:text-red-600 cursor-pointer transition-all hover:scale-125'/>
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </CardContent>
            </Card>
        </>
    )
}

export default NotesSidebar