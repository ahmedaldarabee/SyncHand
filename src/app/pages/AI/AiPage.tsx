import { Chatbot } from '@/components/component/chatbot'
import { Menu } from 'lucide-react'
import React from 'react'
import { useContextApp } from '../contextApp';

const AiPage = () => {
  const {
    openSideBarObject: { setOpenSideBar },
} = useContextApp();

    return (
        <main className='w-full min-h-screen flex items-center justify-center bg-slate-50'>
          <div className='self-start translate-x-5 translate-y-5'>
            <Menu
                  onClick={() => setOpenSideBar(prev => !prev)}
                  className='text-slate-400 h-9 cursor-pointer hidden max-[940px]:block'
              />
          </div>
          <Chatbot />
        </main>
    )
}

export default AiPage