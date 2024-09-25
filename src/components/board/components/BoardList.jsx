import styled from "styled-components";
import {BoardCard} from "./BoardCard.jsx";

export function BoardList() {
    return (
        <List>
            <li>
                <BoardCard title='To do'/>
            </li>
            <li>
                <BoardCard title='Doing'/>
            </li>
            <li>
                <BoardCard title='Done'/>
            </li>
        </List>
    )
}

const List = styled.ol`
    all: unset;
    list-style: none;
    position: absolute;
    display: flex;
    gap: 6px;
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
        border-radius: 12px;
        height: 100%;
    }
`;
