import {useEffect, useRef, useState} from "react";
import {Button, ButtonLink, Icon} from "@ui";
import {useTranslation} from "react-i18next";

export function BoardHeader() {
    const {t} = useTranslation();
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

                <Button scale='dynamic' size='lg' onClick={() => setIsFavorite(prev => !prev)}>
                    {isFavorite ? (<Icon size='16px' name="starFull"/>) : (
                        <Icon size='16px' name="starEmpty"/>)}
                </Button>

                <Button scale='dynamic' size='lg' onClick={() => console.log('open workspace menu')}>
                    <Icon size='16px' name="workspace"/>
                </Button>

                <Button scale='dynamic' size='lg' className='active' onClick={() => console.log('board view')}>
                    <Icon size='16px' name="list"/>
                    <span>{t('BOARD')}</span>
                </Button>

                <Button scale='white' onClick={() => console.log('table view')}>
                    <Icon size='16px' name="table"/>
                    <span>{t('TABLE')}</span>
                </Button>

                <Button scale='dynamic' size='lg' onClick={() => console.log('view menu')}>
                    <Icon size='16px' name="chevronDown"/>
                </Button>
            </div>

            <div className='board-actions'>
                <Button scale='dynamic' onClick={() => console.log('power ups menu')}>
                    <Icon size='16px' name="rocket"/>
                </Button>

                <Button scale='dynamic' onClick={() => console.log('power ups menu')}>
                    <Icon size='16px' name="flash"/>
                </Button>

                <ButtonLink onClick={() => console.log('filter menu')}>
                    <Icon size='16px' name="filter"/>
                    <span>{t('FILTERS')}</span>
                </ButtonLink>
            </div>
        </section>
    )
}