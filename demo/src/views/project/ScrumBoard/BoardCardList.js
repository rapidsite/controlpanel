import { React, useEffect } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import BoardCard from './BoardCard'

function InnerList(props) {
  const { dropProvided, contents, taskCards, ...rest } = props


  return (
    <div className="board-dropzone h-full" ref={dropProvided.innerRef}>
      <div className="px-4 h-full">
        {contents?.map((item, index) => (
          <Draggable
            key={item.id}
            draggableId={item.id}
            index={index}
          >
            {(dragProvided) => (
            <BoardCard
            data={item}
            ref={dragProvided.innerRef}
            {...dragProvided.draggableProps}
            {...dragProvided.dragHandleProps}
            {...rest}
            taskCards={taskCards}
            />
            )}
          </Draggable>
        ))}
      </div>
    </div>
  )
}

const BoardCardList = (props) => {
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId = 'LIST',
    style,
    listType,
    contents,
    useClone,
    taskCards,
  } = props

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
      renderClone={useClone}
    >
      {(dropProvided, dropSnapshot) => (
        <div
          style={style}
          className={`board-wrapper overflow-hidden flex-auto ${
            dropSnapshot.isDraggingOver ? 'bg-blue-100' : ''
          }`}
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <div
              className="board-scrollContainer"
              style={scrollContainerStyle}
            >
              <InnerList
                contents={contents}
                listId={listId}
                taskCards={taskCards}
                dropProvided={dropProvided}
              />
            </div>
          ) : (
            <InnerList
              contents={contents}
              listId={listId}
              taskCards={taskCards}
              dropProvided={dropProvided}
            />
          )}
          {dropProvided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default BoardCardList
