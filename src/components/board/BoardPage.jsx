import {Board} from "./Board.jsx";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {BoardHeader} from "./components/BoardHeader.jsx";
import {BoardCard} from "./components/BoardCard.jsx";
import {monitorForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {BoardContext} from "./context/board-context.jsx";
import {loadBoard} from "../../store/board/board.actions.js";

export function BoardPage() {
    const {boardId} = useParams();
    const board = useSelector(state => state.boardModule.board);
    const [instanceId] = useState(() => Symbol("instance-id"));

    useEffect(() => {
        loadBoard(boardId);
    }, [boardId]);

    useEffect(() => {
        return monitorForElements({
            canMonitor({source}) {
                return source.data.instanceId === instanceId;
            },
        });
    }, [board, instanceId]);

    const contextValue = useMemo(() => {
        return {
            instanceId
        }
    }, [instanceId])

    console.log('board ', board);

    return (
        <BoardContext.Provider value={contextValue}>
            <section className='board'>
                <BoardHeader/>

                <div className="canvas">
                    <Board>
                        {board?.orderedGroupsIds.map((columnId) => {
                            return (
                                <BoardCard key={columnId} title={board.groups[columnId].title}
                                           group={board.groups[columnId]}/>
                            )
                        })}
                    </Board>
                </div>
            </section>
        </BoardContext.Provider>
    )
}
