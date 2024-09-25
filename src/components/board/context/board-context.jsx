import {createContext, useContext} from "react";

export const BoardContext = createContext({
    reorderColumn: () => {},
    reorderCard: () => {},
    moveCard: () => {},
});

export function useBoardContext() {
    const value = useContext(BoardContext);

    if (!value) {
        throw new Error('Cannot find BoardContext provider');
    }

    return value;
}