import React, { useEffect } from 'react'
import { Button } from 'components/ui'
import BoardAddNewColumn from './BoardAddNewColumn'
import QuickFilterTab from './QuickFilterTab'
import { Container, UsersAvatarGroup } from 'components/shared'
import { getMembers } from './store/dataSlice'
import { openDialog, updateDialogView } from './store/stateSlice'
import { HiOutlineUserAdd, HiOutlineCog } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const BoardHeader = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const boardMembers = useSelector(
        (state) => state.scrumBoard.data.boardMembers
    )

    const onAddMember = () => {
        dispatch(updateDialogView('ADD_MEMBER'))
        dispatch(openDialog())
    }

    useEffect(() => {
        dispatch(getMembers())
    }, [dispatch])

    return (
        <div className="pt-8 pb-4 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
            <Container className="px-6">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <p className="mb-1">Rapidsite</p>
                        <h3>Second Brain</h3>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                    <QuickFilterTab />
                    <div className="flex items-center gap-2">
                        <BoardAddNewColumn />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default BoardHeader
