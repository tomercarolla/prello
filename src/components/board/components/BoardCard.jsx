import {Popover, Button, Icon} from "@ui";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Task} from "./Task.jsx";

export function BoardCard({title, tasks}) {
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

            {!isCollapsed ? (
                <>
                    <div className="dynamic-content">
                        <ol className='tasks-list'>
                            {tasks.map(task => (
                                <Task key={task.id} task={task}/>
                            ))}
                        </ol>
                    </div>

                    <div className="footer">
                        <Button scale='ghost' fullwidth='true' radius='8px' className='add-btn'>
                            <Icon name='plus' size='16px'/>
                            <span>{t('ADD_CARD')}</span>
                        </Button>
                    </div>
                </>
            ) : null}
        </div>
    )
}
