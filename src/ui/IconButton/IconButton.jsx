import styled from "styled-components";

export const IconButton = styled.button`
    width: 32px;
    height: 32px;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--dynamic-button);
    border-radius: 3px;
    color: var(--dynamic-text);
    //todo - move to generic place
    transition-property: background-color, border-color, box-shadow;
    transition-duration: 85ms;
    transition-timing-function: ease;
    cursor: pointer;
    border: none;
    
    &:hover {
        background-color: var(--dynamic-button-hovered);
    }
`;