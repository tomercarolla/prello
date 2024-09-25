import {Popover, Button, Icon, Menu} from "@ui";
import {useState} from "react";
import {useTranslation} from "react-i18next";

export function BoardCard({title, tasks}) {
    const {t} = useTranslation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    console.log('tasks ', tasks)

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
                                <li key={task.id}>
                                    {task?.style?.backgroundImage ? (
                                        <div className="img-container"
                                             style={{backgroundImage: task.backgroundImage}}
                                        />
                                    ) : null}
                                    <div className="task-container">
                                        <div className="task-content">
                                            <a href="#">
                                                {task.title}
                                                {/*Invite collaborators to your board by selecting the menu to the right of the*/}
                                                {/*notifications bell.*/}
                                            </a>
                                            <div className="task-badges"></div>
                                        </div>
                                    </div>

                                    <Button scale='ghost' radius='16px' className='edit-btn'>
                                        <Icon name='edit' size='16px'/>
                                    </Button>
                                </li>
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
