import styled from "styled-components";
import {Draggable} from "react-beautiful-dnd";

export function Task({task, index}) {

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                    ref={provided.innerRef}
                >
                    {task.title}
                </Container>
            )}
        </Draggable>
    )
}

const Container = styled.div.attrs(props => ({
    isDragging: undefined
}))`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'transparent')};
`;