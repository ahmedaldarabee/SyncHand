import { Note } from '@/lib/type'
import React from 'react';
import { Card, CardFooter, CardHeader, CardTitle } from './card';
import { formatingDate } from '@/lib/timestamp';
import { CardContent } from '@mui/material';
import { Button } from './button';

interface NoteViewProps {
    note: Note,
    onEdit: () => void
}

const NoteView = ({note, onEdit}: NoteViewProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                <p className='text-[14px] text-muted-foreground'> {formatingDate(note.createdAt)} </p>
            </CardHeader>

            <CardContent>
                {note.content}
            </CardContent>

            <CardFooter className='flex justify-end m-1'>
                <Button onClick={onEdit} className='bg-sky-500 hover:bg-sky-600'> Edit </Button>
            </CardFooter>
        </Card>
    )
}

export default NoteView