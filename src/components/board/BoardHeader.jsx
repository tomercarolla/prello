import {useEffect, useRef, useState} from "react";
import {IconButton} from "../../ui/IconButton.jsx";
import {StarFilled, StarOutlined} from "@ant-design/icons";

export function BoardHeader() {
    const [boardName, setBoardName] = useState('Basic Board');
    const [showInput, setShowInput] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (showInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showInput]);

    return (
        <section className='header'>
            <div className='board-info'>
                <div role='textbox'
                     className='board-name'
                     onClick={() => setShowInput(true)}
                >
                    {showInput ? (
                        <input type="text"
                               ref={inputRef}
                               onBlur={() => setShowInput(false)}
                               value={boardName}
                               onChange={(e) => setBoardName(e.target.value)}
                        />
                    ) : (
                        <h1>{boardName}</h1>
                    )}
                </div>

                <IconButton onClick={() => setIsFavorite(prev => !prev)}>
                    {isFavorite ? (<StarFilled />) : (<StarOutlined />)}
                </IconButton>
            </div>
            <div></div>
        </section>
    )
}
