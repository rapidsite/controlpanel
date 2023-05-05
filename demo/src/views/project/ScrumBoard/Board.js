import React, { useEffect, lazy, Suspense } from 'react'
import { Dialog } from 'components/ui'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'
import { getBoards } from './store/dataSlice'
import { useSelector, useDispatch } from 'react-redux'
import { updateColumns, updateOrdered } from './store/dataSlice'
import { closeDialog } from './store/stateSlice'
import { reorder, reorderQuoteMap } from './utils'
import BoardColumn from './BoardColumn'
import { useTaskCards } from 'mock/data/customhook/useTaskCards';
import { useHeaders } from 'mock/data/customhook/useHeaders';

const TicketContent = lazy(() => import('./TicketContent'))
const AddNewTicketContent = lazy(() => import('./AddNewTicketContent'))
const AddNewColumnContent = lazy(() => import('./AddNewColumnContent'))
const AddNewMemberContent = lazy(() => import('./AddNewMemberContent'))

const Board = (props) => {
    const {
        containerHeight,
        useClone,
        isCombineEnabled,
        withScrollableColumns,
    } = props

    let taskCards = useTaskCards();

    const headers = useHeaders();
    const columns = headers.map((board) => ({
        title: board.title,
        listId: board.listId
      })); 

    const dispatch = useDispatch() 

    // dispatch(taskCards)

    // const columns = [{ title: 'Submitted', tasks: submittedCards },{ title: 'Todo', tasks: todoCards },{ title: 'Urgent', tasks: urgentCards },{ title: 'Completed', tasks: completedCards }];

    const dialogOpen = useSelector((state) => state.scrumBoard.state.dialogOpen)
    const dialogView = useSelector((state) => state.scrumBoard.state.dialogView)

    const onDialogClose = () => {
        dispatch(closeDialog())
    }
    const onDragEnd = (result) => {
        if (result.combine) {
            if (result.type === 'COLUMN') {
                const shallow = [...columns];
                shallow.splice(result.source.index, 1)
                dispatch(updateOrdered(shallow))
                return
            }

            const column = columns[result.source.droppableId]
            const withQuoteRemoved = [...column]
            withQuoteRemoved.splice(result.source.index, 1)
            const newColumns = {
                ...columns,
                [result.source.droppableId]: withQuoteRemoved,
            }
            dispatch(updateColumns(newColumns))
            return
        }

        if (!result.destination) {
            return
        }

        const source = result.source
        const destination = result.destination

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return
        }

        if (result.type === 'COLUMN') {
            const newOrdered = reorder(columns, source.index, destination.index)
            dispatch(updateOrdered(newOrdered))
            return
        }

        const data = reorderQuoteMap({
            quoteMap: columns,
            source,
            destination,
        })

        dispatch(updateColumns(data.quoteMap))
    }

    return (
        <>
        
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable
                    droppableId="board"
                    type="COLUMN"
                    direction="horizontal"
                    ignoreContainerClipping={containerHeight}
                    isCombineEnabled={isCombineEnabled}
                >
                    {(provided) => (
                        <div
                            className="scrumboard flex flex-col flex-auto w-full h-full mb-2"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <div className="scrumboard-body flex max-w-full overflow-x-auto h-full mt-4">
                                {columns?.map((column, index) => (
                                    <BoardColumn
                                    key={column.title}
                                    listType="CONTENT"
                                    listId = {column.listId}
                                    index={index}
                                    title={column.title}
                                    contents={taskCards.filter((card) => card.listId === column.listId)}
                                    isScrollable={withScrollableColumns}
                                    isCombineEnabled={isCombineEnabled}
                                    useClone={useClone}
                                    taskCards={taskCards}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <Dialog
                isOpen={dialogOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                width={dialogView !== 'TICKET' ? 520 : 800}
                closable={dialogView !== 'TICKET'}
            >
                <Suspense fallback={<></>}>
                    {dialogView === 'TICKET' && (
                        <TicketContent onTicketClose={onDialogClose} />
                    )}
                    {dialogView === 'NEW_TICKET' && <AddNewTicketContent />}
                    {dialogView === 'NEW_COLUMN' && <AddNewColumnContent />}
                    {dialogView === 'ADD_MEMBER' && <AddNewMemberContent />}
                </Suspense>
            </Dialog>
        </>
    )
}

export default Board



