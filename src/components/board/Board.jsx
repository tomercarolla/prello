import {BoardHeader} from "./components/BoardHeader.jsx";
import {BoardList} from "./components/BoardList.jsx";
import {useEffect} from "react";

import { loadBoards } from "store/board.actions.js";
import { useSelector } from "react-redux";


export function Board() {
    const boards = useSelector(state => state.boardModule.boards)

    useEffect(() => {
        loadBoards();
    }, [boards]);

    return (
        <section className='board'>
            <BoardHeader />

            <div className="canvas">
                <BoardList />
            </div>
        </section>
    );
}
