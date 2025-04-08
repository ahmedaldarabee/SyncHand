import React, { ReactNode } from 'react'
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import EmptyScreen from '../ui/empty-statate';
import { Note } from '@/lib/type';
import { Trash2 } from 'lucide-react';
import { formatingDate } from '@/lib/timestamp';

interface NoteProps {
    notes: Note[],
}
const NotesSidebar = ({notes}:NoteProps) => {

    const dataHandler = (data: string) => {
        const mainTitle = data.substring(0,30);
        const titleLength = data.length > 40 ? "..." : "";
        return mainTitle + titleLength;
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className='text-center'>Projects Notes</CardTitle>
                </CardHeader>

                <CardContent>
                    {
                        notes.length === 0 ? (
                            <EmptyScreen message='Still there are no notes' buttonTxt='create your new notes' />
                        ) : (
                            <div>
                                {
                                    notes.map((note: Note) => (
                                        <div key={note.id} className='p-3 rounded-md cursor-pointer hover:bg-accent transition-all'>
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

                                                <div>
                                                    <Trash2 className='w-4 h-4 hover:text-red-600 cursor-pointer transition-all hover:scale-125'/>
                                                </div>
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