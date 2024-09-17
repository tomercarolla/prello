import {Icon, IconButton} from "@ui";
import {useState} from "react";

export function BoardCard({title}) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <div className={`board-card ${isCollapsed ? 'collapsed' : ''}`} onClick={() => {
            if (isCollapsed) {
                setIsCollapsed(prev => !prev)
            }
        }}>
            <div className="top">
                <div className="name">
                    <h2>{title}</h2>
                </div>

                <IconButton radius='8px' onClick={() => setIsCollapsed(prev => !prev)}>
                    {isCollapsed ? (
                        <Icon name='expand'/>
                    ) : (
                        <Icon name='collapse'/>
                    )}
                </IconButton>

                {/*todo replace to icon*/}
                {isCollapsed ? (
                    <div className="counter">
                        3
                    </div>
                ) : (
                    <IconButton radius='8px'>
                        <Icon size='16px' name='menuHorizontal' />
                    </IconButton>
                )}
            </div>
        </div>
    )
}
