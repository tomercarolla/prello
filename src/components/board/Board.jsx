import styled from "styled-components";
import {useBoardContext} from "./context/board-context.jsx";
import { autoScrollWindowForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import {useEffect} from "react";

export function Board({children}) {
    const { instanceId } = useBoardContext();

    useEffect(() => {
        return autoScrollWindowForElements({
            canScroll: ({ source }) => source.data.instanceId === instanceId,
        });
    }, [instanceId]);

    return (
        <List>
            {children}
        </List>
    );
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
