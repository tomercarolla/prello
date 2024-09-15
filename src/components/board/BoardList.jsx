import styled from "styled-components";

export function BoardList() {
    return (
        <List>
            <li>To-Do</li>
            <li>In progress</li>
            <li>Done</li>
        </List>
    )
}

const List = styled.ol`
    all: unset;
    list-style: none;
    position: absolute;
    display: flex;
    gap: 12px;
    inset: 0;
    overflow-x: auto;
    overflow-y: hidden;
    user-select: none;
    white-space: nowrap;
    padding-block-end: 8px;
    padding-inline: 6px;

    //todo - move scroll desgin to setup.scss
    //scrollbar-color: #fff6 #00000026;
    //scrollbar-width: auto;
    
    li {
        
    }
`;
