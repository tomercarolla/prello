import {Popover, Button, Icon, Menu} from "@ui";
import {useState} from "react";
import {useTranslation} from "react-i18next";

export function BoardCard({title}) {
    const {t} = useTranslation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`board-card ${isCollapsed ? 'collapsed' : ''}`} onClick={() => {
            if (isCollapsed) {
                setIsCollapsed(false)
            }
        }}>
            <div className="top">
                <div className="name">
                    <h2>{title}</h2>
                </div>

                <Button scale='ghost' radius='8px' onClick={() => setIsCollapsed(true)}>
                    {isCollapsed ? (
                        <Icon name='expand'/>
                    ) : (
                        <Icon name='collapse'/>
                    )}
                </Button>

                {isCollapsed ? (
                    <div className="counter">
                        3
                    </div>
                ) : (
                    <Popover
                        trigger={
                            <Button scale='ghost' radius='8px'>
                                <Icon size='16px' name='menuHorizontal'/>
                            </Button>
                        }
                    >
                        <Button fullwidth='true' scale='ghost'
                                onClick={() => console.log('clicked')}
                        >
                            Click me
                        </Button>

                        <Button as='a' scale='ghost'>
                            Im a link
                        </Button>
                    </Popover>
                )}
            </div>

            <div className="dynamic-content">
                <ol className='tasks-list'>
                    <li>
                        <div className="task-container">
                            <div className="task-content">
                                <a href="#">
                                    Invite collaborators to your board by selecting the menu to the right of the
                                    notifications bell.
                                </a>
                                <div className="task-badges"></div>
                            </div>
                        </div>

                        <Button scale='ghost' radius='16px' className='edit-btn'>
                            <Icon name='edit' size='16px'/>
                        </Button>
                    </li>

                    <li>
                        <div className="task-container">
                            <div className="img-container"
                                 style={{backgroundImage: "url(`https://trello.com/1/cards/66e30d1ef24cacb885f0129e/attachments/66e30d1ef24cacb885f01362/previews/66e30d1ef24cacb885f01367/download/sergey-shmidt-koy6FlCCy5s-unsplash.jpg`)"}}
                            />
                            <div className="task-content">
                                <a href="#">
                                    Invite collaborators to your board by selecting the menu to the right of the
                                    notifications bell.
                                </a>
                                <div className="task-badges"></div>
                            </div>
                        </div>

                        <Button scale='ghost' radius='16px' className='edit-btn'>
                            <Icon name='edit' size='16px'/>
                        </Button>
                    </li>
                </ol>
            </div>

            <div className="footer">
                <Button scale='ghost' fullwidth='true' radius='8px' className='add-btn'>
                    <Icon name='plus' size='16px'/>
                    <span>{t('ADD_CARD')}</span>
                </Button>
            </div>
        </div>
    )
}
