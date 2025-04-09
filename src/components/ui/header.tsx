import React from 'react'
import { Button } from './button'
import { Menu, Plus } from 'lucide-react'
import { useContextApp } from '@/app/pages/contextApp';

interface HeaderProps {
    onNewNote: () => void,
}

const Header = ({onNewNote}: HeaderProps) => {
    const {
        openSideBarObject: { setOpenSideBar },
    } = useContextApp();
    return (
        <div className='border-b p-4 bg-card'>
            <div className='container mx-auto flex justify-between items-center'>
                <h2 className='text-2xl font-bold text-sky-500'>SyncHand</h2>
                
                <div className='flex gap-1'>
                    <Button onClick={onNewNote} className='cursor-pointer bg-sky-500 hover:bg-sky-600' size="sm">
                        <Plus className='w-4 h-4 mr-2'/>New Note
                    </Button>
                    <Menu
                        onClick={() => setOpenSideBar(prev => !prev)}
                        className='text-slate-400 h-9 cursor-pointer hidden max-[940px]:block'
                    />
                </div>
            </div>
        </div>
    )
}

export default Header