import React from 'react'
import MailList from './MailList'
import MailDetail from './MailDetail'
import {Input} from 'components/ui'

const MailBody = () => {
    return (
        <div className="flex flex-auto w-full">
            
            <MailList />
            <MailDetail />
        </div>
    )
}

export default MailBody
