import {Popover, Button, Icon} from "@ui";
import {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Task} from "./Task.jsx";
import {combine} from "@atlaskit/pragmatic-drag-and-drop/combine";
import {draggable, dropTargetForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {useBoardContext} from "../context/board-context.jsx";
import {setCustomNativeDragPreview} from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import {centerUnderPointer} from "@atlaskit/pragmatic-drag-and-drop/element/center-under-pointer";
import {
    attachClosestEdge,
    extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import {autoScrollForElements} from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
import { token } from "@atlaskit/tokens";

const idle = {type: "idle"};
const isCardOver = {type: "is-card-over"};

export function BoardCard({title, group}) {
    const {t} = useTranslation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const groupId = group.id;
    const groupRef = useRef(null);
    const groupInnerRef = useRef(null);
    const scrollableRef = useRef(null);
    const [state, setState] = useState(idle);
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState(null);

    const {instanceId} = useBoardContext();

    console.log('preview ', preview)

    useEffect(() => {
        if (!groupRef.current || !groupInnerRef.current || !scrollableRef.current) {
            return;
        }

        return combine(
            draggable({
                element: groupRef.current,
                getInitialData() {
                    return {groupId, type: "group", instanceId}
                },
                onDragStart() {
                    setIsDragging(true);
                },
                onDrop() {
                    setIsDragging(false);
                },
                onGenerateDragPreview: ({nativeSetDragImage}) => {
                    setCustomNativeDragPreview({
                        nativeSetDragImage,
                        getOffset: centerUnderPointer,
                        render({container}) {
                            setPreview(container);
                        },
                    })
                }
            }),
            dropTargetForElements({
                element: groupInnerRef.current,
                getData: () => ({groupId}),
                canDrop: ({source}) => {
                    return source.data.instanceId === instanceId && source.data.type === "card";
                },
                getIsSticky: () => true,
                onDragEnter: () => setState(isCardOver),
                onDragLeave: () => setState(idle),
                onDragStart: () => setState(isCardOver),
                onDrop: () => setState(idle)
            }),
            dropTargetForElements({
                element: groupRef.current,
                canDrop: ({source}) => {
                    return source.data.instanceId === instanceId && source.data.type === "group"
                },
                getIsSticky: () => true,
                getData: ({input, element}) => {
                    const data = {groupId};

                    return attachClosestEdge(data, {
                        input,
                        element,
                        allowedEdges: ["left", "right"]
                    });
                },
                onDragEnter: (args) => {
                    setState({
                        type: "is-group-over",
                        closesEdge: extractClosestEdge(args.self.data)
                    })
                },
                onDrag: (args) => {
                    setState((current) => {
                        const closesEdge = extractClosestEdge(args.self.data);

                        if (current.type === 'is-group-over' &&
                            current.closesEdge === closesEdge
                        ) {
                            return current;
                        }

                        return {
                            type: 'is-group-over',
                            closesEdge
                        }
                    })
                },
                onDragLeave: () => setState(idle),
                onDrop: () => setState(idle)
            }),
            autoScrollForElements({
                element: scrollableRef.current,
                canScroll: ({source}) =>
                    source.data.instanceId === instanceId && source.data.type === "card"
            })
        )
    }, [groupId, instanceId]);

    console.log(group);

    return (
        <li ref={groupRef} className={isDragging ? 'drag' : ''}>
            <div className='inner' ref={groupInnerRef}>
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
                            <div className="dynamic-content" ref={scrollableRef}>
                                <ol className='tasks-list'>
                                    {group.tasks.map(task => (
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
            </div>

            {state.type === "is-column-over" && state.closestEdge && (
                <DropIndicator
                    edge={state.closestEdge}
                    gap={token("space.200", "0")}
                />
            )}
        </li>
    )
}
