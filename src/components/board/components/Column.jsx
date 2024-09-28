import styled from "styled-components";
import {Task} from "./Task.jsx";
import {Draggable, Droppable} from "react-beautiful-dnd";

export function Column({group, tasks, index}) {

    console.log('tasks ', tasks)
    return (
        <Draggable draggableId={group.id} index={index}>
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <Title {...provided.dragHandleProps}>
                        {group.title}
                    </Title>

                    <Droppable droppableId={group.id} type='task'>
                        {(provided, snapshot) => (
                            <TaskList
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                {tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)}
                                {provided.placeholder}
                            </TaskList>
                        )}
                    </Droppable>
                </Container>
            )}
        </Draggable>
    )
}

const Container = styled.div`
    width: 220px;
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    flex-grow: 1;
    padding: 8px;
    transition: background-color .2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'transparent')};
`;