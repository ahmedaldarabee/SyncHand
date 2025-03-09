import React from 'react'
import { LogOut } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
const Profile = () => {
    return (
        <div title='log out?' className='cursor-pointer w-6 h-6 bg-sky-500 hover:bg-sky-700 transition-all rounded-md flex items-center justify-center'>
            {/* <LogOut className='text-slate-50 w-4 h-4'/> */}
            <UserButton></UserButton>
        </div>
    )
}

export default Profile