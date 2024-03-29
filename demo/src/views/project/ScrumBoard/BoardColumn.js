import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import BoardTitle from './BoardTitle'
import BoardCardList from './BoardCardList'

const BoardColumn = (props) => {
    const { title, contents, index, isScrollable, isCombineEnabled, useClone, taskCards, listId, dropProvided } =
        props
    return (
        <Draggable draggableId={title} index={index}>
            {(provided, snapshot) => (
                <div
                    className="
							board-column 
							flex 
							flex-col
							mb-3
							min-w-[300px] 
							w-[300px] 
							max-w-[300px] 
							p-0
							rounded-lg
						"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <BoardTitle
                        title={title}
                        dragHandleProps={provided.dragHandleProps}
                    />
                    <BoardCardList
                    contents={contents}
                    listId={listId}
                    dropProvided={dropProvided}
                    taskCards={taskCards}
                    />
                </div>
            )}
        </Draggable>
    )
}

export default BoardColumn
