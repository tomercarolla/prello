import {useEffect, useRef, useState} from "react";
import {ButtonLink, Icon, IconButton} from "@ui";
import {useTranslation} from "react-i18next";

export function BoardHeader() {
    const { t } = useTranslation();
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
                    {isFavorite ? (<Icon size='16px' name="starFull" color='#FFF'/>) : (
                        <Icon size='16px' name="starEmpty" color='#FFF'/>)}
                </IconButton>

                <IconButton onClick={() => console.log('open workspace menu')}>
                    <Icon size='16px' name="workspace" color='#FFF'/>
                </IconButton>

                <ButtonLink className='active' onClick={() => console.log('board view')}>
                    <Icon size='16px' name="list" />
                    <span>{t('BOARD')}</span>
                </ButtonLink>

                <ButtonLink onClick={() => console.log('table view')}>
                    <Icon size='16px' name="table" />
                    <span>{t('TABLE')}</span>
                </ButtonLink>

                <IconButton onClick={() => console.log('view menu')}>
                    <Icon size='16px' name="chevronDown" color='#FFF'/>
                </IconButton>
            </div>

            <div className='board-actions'>
                <IconButton onClick={() => console.log('power ups menu')}>
                    <Icon size='16px' name="rocket" color='#FFF'/>
                </IconButton>

                <IconButton onClick={() => console.log('power ups menu')}>
                    <Icon size='16px' name="flash" color='#FFF'/>
                </IconButton>

                <ButtonLink onClick={() => console.log('filter menu')}>
                    <Icon size='16px' name="filter" />
                    <span>{t('FILTERS')}</span>
                </ButtonLink>
            </div>
        </section>
    )
}
