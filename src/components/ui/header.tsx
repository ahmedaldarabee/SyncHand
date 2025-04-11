import React from 'react'
import { Button } from './button'
import { ListPlus, Menu, SearchIcon } from 'lucide-react'
import { useContextApp } from '@/app/pages/contextApp';

interface HeaderProps {
    onNewNote: () => void,
    searchNote: (data: string) => void,
}

const Header = ({onNewNote,searchNote}: HeaderProps) => {
    const {
        openSideBarObject: { setOpenSideBar },
    } = useContextApp();
    return (
        <div className='p-5 bg-slate-50'>
            <div className='container mx-auto flex justify-between items-center'>
                <SearchBarTasks searchNote={searchNote}/>                
                <div className='flex gap-1'>
                    <Button onClick={onNewNote} className='cursor-pointer text-[14px] bg-sky-600 hover:bg-sky-700' size="sm">
                        <ListPlus/>New Note
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

function SearchBarTasks({searchNote}) {
    return (
        <div className="flex items-center">
            <div className="border-b-2 border-sky-600 h-[39px] w-11 justify-center flex items-center">
                <SearchIcon className="text-slate-400 outline-none h-4 w-4"/>
            </div>

            <div className=" border-b-2 border-slate-200">
                <input onChange={(e) => searchNote(e.target.value)} placeholder="Search a Notes..." className={`p-2 bg-transparent text-[14px] outline-none`}/>
            </div>
        </div>
    );
}

export default Header