import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {loadBoard} from "../../store/board/board.actions.js";
import {Column} from "./components/Column.jsx";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import '@atlaskit/css-reset';
import styled from "styled-components";

export function BoardPage() {
    const {boardId} = useParams();
    const board = useSelector(state => state.boardModule.board);

    const dragEnd = (result) => {
        console.log(result);

        const {destination, source, draggableId, type} = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) return;

        if (type === 'group') {
            const newGroupOrder = Array.from(board.orderedGroupsIds);
            newGroupOrder.splice(source.index, 1);
            newGroupOrder.splice(destination.index, 0, draggableId);

            const newBoard = {
                ...board,
                orderedGroupsIds: newGroupOrder
            }

            console.log('newBoard ', newBoard);

            //todo - update the board in the store

            return;
        }

        const startGroup = board.groups[source.droppableId];
        const finishGroup = board.groups[destination.droppableId];

        if (startGroup === finishGroup) {
            const newTasksIds = Array.from(startGroup.tasksIds);
            newTasksIds.splice(source.index, 1);
            newTasksIds.splice(destination.index, 0, draggableId);

            const newGroup = {
                ...startGroup,
                tasksIds: newTasksIds
            }
            const newBoard = {
                ...board,
                groups: {
                    ...board.groups,
                    [newGroup.id]: newGroup
                }
            }

            console.log('newBoard ', newBoard);

            //todo - update the board in the store
        } else {
            const startTaskIds = Array.from(startGroup.tasksIds);

            startTaskIds.splice(source.index, 1);

            const newStart = {
                ...startGroup,
                tasksIds: startTaskIds
            }
            const finishTaskIds = Array.from(finishGroup.tasksIds);

            finishTaskIds.splice(destination.index, 0, draggableId);

            const newFinish = {
                ...finishGroup,
                tasksIds: finishTaskIds
            }

            const newBoard = {
                ...board,
                groups: {
                    ...board.groups,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish
                }
            }

            console.log('newBoard 2', newBoard);

            //todo - update the board in the store
        }
    };

    useEffect(() => {
        loadBoard(boardId);
    }, [boardId]);

    return (
        <DragDropContext onDragEnd={dragEnd}>
            <Droppable
                droppableId='all-groups'
                direction='horizontal'
                type='group'
            >
                {(provided) => (
                    <Container
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {board?.orderedGroupsIds.map((groupId, index) => {
                            const group = board.groups[groupId];
                            const tasks = group.tasksIds.map(taskId => board.tasks[taskId]);

                            return <Column key={group.id} group={group} tasks={tasks} index={index} />;
                        })}
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        </DragDropContext>
    )
}

const Container = styled.div`
    display: flex;

`;
