import {BoardHeader} from "./BoardHeader.jsx";
import {BoardList} from "./BoardList.jsx";

export function Board() {
    return (
        <section className='board'>
            <BoardHeader />

            <div className="canvas">
                <BoardList />
            </div>
        </section>
    );
}
