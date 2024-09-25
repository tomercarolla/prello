import {Button, Icon} from "@ui";
import {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {draggable, dropTargetForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {setCustomNativeDragPreview} from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import {preserveOffsetOnSource} from '@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source';
import {combine} from "@atlaskit/pragmatic-drag-and-drop/combine";

export function Task({task}) {
    const ref = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        return combine(
            draggable({
                element,
                getInitialData() {
                    return task;
                },
                onDragStart() {
                    setIsDragging(true);
                },
                onDrop() {
                    setIsDragging(false);
                    setPreview(null);
                },
                onGenerateDragPreview: ({location, nativeSetDragImage}) => {
                    setCustomNativeDragPreview({
                        nativeSetDragImage,
                        getOffset: preserveOffsetOnSource({
                            element,
                            input: location.current.input,
                        }),
                        render({container}) {
                            setPreview(container);
                        },
                    })
                }
            }),
            dropTargetForElements({
                element,
                getData() {
                    return task;
                },
                onDrop({location, source, self}) {
                    console.log('loc ', location.current)
                    console.log(source.data.id)
                    console.log(self.data.id)
                }
            })
        )
    }, [task]);

    console.log('task ', task)

    return (
        <li ref={ref} className={isDragging ? 'drag' : ''}>
            {task?.style?.backgroundImage ? (
                <div className="img-container"
                     style={{backgroundImage: task.backgroundImage}}
                />
            ) : null}
            <div className="task-container">
                <div className="task-content">
                    <a href="#" draggable='false'>
                        {task.title}
                    </a>
                    <div className="task-badges"></div>
                </div>
            </div>

            <Button scale='ghost' radius='16px' className='edit-btn'>
                <Icon name='edit' size='16px'/>
            </Button>

            {preview && createPortal(<TaskPreview task={task} />, preview)}
        </li>
    )
}

const TaskPreview = ({task}) => {
    return (
        <div className='task-preview'>
            {task?.style?.backgroundImage ? (
                <div className="img-container"
                     style={{backgroundImage: task.backgroundImage}}
                />
            ) : null}
            <div className="task-container">
                <div className="task-content">
                    <a href="#" draggable='false'>
                        {task.title}
                    </a>
                    <div className="task-badges"></div>
                </div>
            </div>
        </div>
    )
}