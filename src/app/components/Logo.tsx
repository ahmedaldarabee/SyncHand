import React from 'react'
import { CircleCheckBig,FoldHorizontal } from 'lucide-react';
import { useContextApp } from '../pages/contextApp';


const Logo = () => {

    const {
        openSideBarObject: {openSideBar},
    } = useContextApp();

    return (
        <div className='rounded-md h-10 w-10 flex items-center justify-center cursor-pointer'>
            {/* md and more */}
            <CircleCheckBig className='max-sm:hidden md:flex w-8 h-8 font-bold text-sky-600'/>
            {/* smaller screen */}
            <div title='screen controlling'>
                <FoldHorizontal className='max-sm:flex md:hidden w-8 h-8 font-bold text-sky-600'/>
            </div>
        </div>
    )
}

export default Logo