import {BoardHeader} from "./components/BoardHeader.jsx";
import {BoardList} from "./components/BoardList.jsx";
import {useEffect} from "react";

import { loadBoard } from "store/board/board.actions.js";
import { useSelector } from "react-redux";
import { useParams } from "react-router";


export function Board() {
   
    const board = useSelector(state => state.boardModule.board)
    const { boardId } = useParams()

    useEffect(() => {
        loadBoard(boardId)
        console.log(board)
    }, [])
    


    return (
        <section className='board'>
            <BoardHeader />

            <div className="canvas">
                <BoardList />
            </div>
        </section>
    );
}
