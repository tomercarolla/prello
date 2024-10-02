import { attachClosestEdge, extractClosestEdge} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Button, Icon } from '@ui';
import * as Dialog from '@radix-ui/react-dialog';
import { TaskDetails } from 'components/taskDetails/TaskDetails';
import { useEffect, useRef, useState } from 'react';
import invariant from 'tiny-invariant';
import { Modal } from 'ui/Modal/Modal';


export const Task = ({ ...task }) => {
  const taskRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [closestEdge, setClosestEdge] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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
          // Only update the closest edge if the card being dragged is not the same as the card
          if (args.source.data.taskId !== task.id) {
            setClosestEdge(extractClosestEdge(args.self.data));
          }
        },
        onDragLeave: () => setClosestEdge(null),
        onDrop: () => setClosestEdge(null),
      }),
    );
  }, [task.id]);


  function handleTaskClick() {
    setModalOpen(true);
  }

  const taskContent = (
    <div
      ref={taskRef}
      className={`task ${dragging ? 'dragging' : ''}`}
    >
      {task?.style?.backgroundImage ? (
        <div
          className="img-container"
          style={{ backgroundImage: task.backgroundImage }}
        />
      ) : null}

      <div className="task-container">
        <div className="task-content">
          <a href="#" draggable="false">
            {task.title}
          </a>
          <div className="task-badges"></div>
        </div>
      </div>

      <Button scale="ghost" radius="16px" className="edit-btn">
        <Icon name="edit" size="16px" />
      </Button>
      {closestEdge && <DropIndicator edge={closestEdge} gap="8px" />}
    </div>
  );

  return (
    <Modal
      open={modalOpen}
      onOpenChange={setModalOpen}
      title='Task Details'
      trigger={taskContent}
    >
      <TaskDetails task={task} />
    </Modal>
  );
};

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
