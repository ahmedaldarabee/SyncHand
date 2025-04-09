import React from 'react'
import { Button } from './button'
import { Plus } from 'lucide-react'

interface HeaderProps {
    onNewNote: () => void,
}

const Header = ({onNewNote}: HeaderProps) => {
    return (
        <div className='border-b p-4 bg-card'>
            <div className='container mx-auto flex justify-between items-center'>
                <h2 className='text-2xl font-bold text-sky-500'>SyncHand</h2>
                <Button onClick={onNewNote} className='cursor-pointer bg-sky-500 hover:bg-sky-600' size="sm">
                    <Plus className='w-4 h-4 mr-2'/>New Note
                </Button>
            </div>
        </div>
    )
}

export default Header