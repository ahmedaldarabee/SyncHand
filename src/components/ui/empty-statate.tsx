import React from 'react'
import { Button } from './button'
import { Plus } from 'lucide-react'

interface EmptyScreenProps{
    message: string,
    buttonTxt: string,
    onButtonClick?:() => void,
}

const EmptyScreen = ({message,buttonTxt,onButtonClick}: EmptyScreenProps) => {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='text-center p-8'>
                <p className='text-muted-foreground mb-4'>{message}</p>
                
                <Button className='capitalize' onClick={onButtonClick}>
                    <Plus className='w-4 h-4 mr-2'/>{buttonTxt}
                </Button>
            </div>
        </div>
    )
}

export default EmptyScreen