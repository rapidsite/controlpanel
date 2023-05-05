import React, { useRef } from 'react'
import { Button, Dialog } from 'components/ui'
import { HiOutlinePencilAlt, HiOutlineFlag } from 'react-icons/hi'
import BlacklistEditor from './BlacklistEditor'
import { useSelector, useDispatch } from 'react-redux'
import { toggleNewMessageDialog } from '../store/BLSlice'

const Blacklist = () => {
    const dispatch = useDispatch()

    const blacklistEditorRef = {
        formikRef: useRef(),
    }

    const isOpen = useSelector((state) => state.BL.state2.newMessageDialog)

    const onDialogOpen = () => {
        dispatch(toggleNewMessageDialog(true))
    }

    const onDialogClose = () => {
        dispatch(toggleNewMessageDialog(false))
    }

   

    const onSend = (values) => {
        
        
    }

    return (
        <>
            <Button
                variant="solid"
                block
                icon={<HiOutlineFlag />}
                onClick={onDialogOpen}
            >
                Blacklist
            </Button>
            <Dialog
                isOpen={isOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">Blacklist an email</h5>
                <div className="max-h-[400px] overflow-y-auto px-1">
                    <BlacklistEditor ref={blacklistEditorRef} mode="new" />
                </div>
                
            </Dialog>
        </>
    )
}

export default Blacklist
