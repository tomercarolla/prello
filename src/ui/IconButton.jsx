import styled from "styled-components";

export const IconButton = styled.button`
    width: 32px;
    height: 32px;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--dynamic-button);
    color: var(--dynamic-text);
    //todo - move to generic place
    transition-property: background-color, border-color, box-shadow;
    transition-duration: 85ms;
    transition-timing-function: ease;
    
    &:hover {
        background-color: var(--dynamic-button-hovered);
    }
`;