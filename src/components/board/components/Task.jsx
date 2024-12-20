import {
  attachClosestEdge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Button, Icon, Modal } from '@ui';
import { useEffect, useRef, useState } from 'react';
import invariant from 'tiny-invariant';
import { TaskDetails } from '../../task-details/TaskDetails.jsx';
import { useBoardContext } from '../board-context.jsx';
import { Labels } from './Labels.jsx';

export function Task({ board, groupId, ...task }) {
  const taskRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [closestEdge, setClosestEdge] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { setTaskId } = useBoardContext();

  useEffect(() => {
    setTaskId(task.id);
  }, [setTaskId, task.id]);

  useEffect(() => {
    invariant(taskRef);

    return combine(
      draggable({
        element: taskRef.current,
        onDragStart: () => setDragging(true),
        onDrop: () => setDragging(false),
        getInitialData: () => ({ type: 'task', taskId: task.id }),
      }),
      dropTargetForElements({
        element: taskRef.current,
        canDrop: ({ source }) => source.data.type === 'task',
        getIsSticky: () => true,
        getData: ({ input, element }) => {
          const data = { type: 'task', taskId: task.id };

          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ['top', 'bottom'],
          });
        },
        onDragEnter: (args) => {
          if (args.source.data.taskId !== task.id) {
            setClosestEdge(extractClosestEdge(args.self.data));
          }
        },
        onDrag: (args) => {
          if (args.source.data.taskId !== task.id) {
            setClosestEdge(extractClosestEdge(args.self.data));
          }
        },
        onDragLeave: () => setClosestEdge(null),
        onDrop: () => setClosestEdge(null),
      }),
    );
  }, [task.id]);

  const taskContent = (
    <div ref={taskRef} className={`task ${dragging ? 'dragging' : ''}`}>
      {task?.style?.backgroundImage ? (
        <div
          className="img-container"
          style={{ backgroundImage: task.backgroundImage }}
        />
      ) : null}

      <div className="task-container">
        <div className="task-content">
          <Labels task={task} />
          <a href="#" draggable="false">
            {task.title}
          </a>

          <div className="task-badges">
            {task.description ? <Icon name="description" size="16px" /> : null}
          </div>
        </div>
      </div>

      <Button scale="ghost" radius="16px" className="edit-btn">
        <Icon name="edit" size="16px" />
      </Button>

      {closestEdge && <DropIndicator edge={closestEdge} gap="8px" />}
    </div>
  );

  return (
    <Modal open={modalOpen} onOpenChange={setModalOpen} trigger={taskContent}>
      <TaskDetails task={task} groupId={groupId} />
    </Modal>
  );
}

const DropIndicator = ({ edge, gap }) => {
  const edgeClassMap = {
    top: 'edge-top',
    bottom: 'edge-bottom',
  };

  const edgeClass = edgeClassMap[edge];

  const style = {
    '--gap': gap,
  };

  return <div className={`drop-indicator ${edgeClass}`} style={style}></div>;
};
