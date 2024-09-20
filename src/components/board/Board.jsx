import {BoardHeader} from "./components/BoardHeader.jsx";
import {BoardList} from "./components/BoardList.jsx";
import {useEffect, useState} from "react";
import {boardService} from "../../services/board.service.local.js";


export function Board() {
    const [board, setBoard] = useState(null);

    useEffect(() => {
        loadBoard();
    }, []);

    async function loadBoard() {
        try {
            const board = await boardService.query();

            setBoard(board);
        } catch (err) {
            console.log(err);
        }
    }

    console.log(board)

    return (
        <section className='board'>
            <BoardHeader />

            <div className="canvas">
                <BoardList />
            </div>
        </section>
    );
}
