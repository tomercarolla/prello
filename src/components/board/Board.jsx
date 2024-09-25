import {BoardHeader} from "./components/BoardHeader.jsx";
import {BoardList} from "./components/BoardList.jsx";
import {useEffect} from "react";

import {loadBoard} from "store/board.actions.js";
import {useSelector} from "react-redux";
import {useParams} from "react-router";


export function Board() {
    const {boardId} = useParams();
    const board = useSelector(state => state.boardModule.board)

    useEffect(() => {
        loadBoard(boardId);
    }, [boardId]);

    console.log('board ', board)

    return (
        <section className='board'>
            <BoardHeader/>

            <div className="canvas">
                <BoardList groups={board?.groups}/>
            </div>
        </section>
    );
}
