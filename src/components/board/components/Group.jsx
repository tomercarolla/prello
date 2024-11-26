import {
  attachClosestEdge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Button, Icon, Popover } from '@ui';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import invariant from 'tiny-invariant';
import { GroupName } from './GroupName.jsx';
import { NewTask } from './NewTask.jsx';
import { Task } from './Task.jsx';

export const Group = ({ group, tasks }) => {
  const { t } = useTranslation();
  const groupRef = useRef(null);
  const groupInnerRef = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [closestEdge, setClosestEdge] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const groupId = group.id;

  useEffect(() => {
    invariant(groupRef);
    invariant(groupInnerRef);

    return combine(
      draggable({
        element: groupRef.current,
        getInitialData: () => ({ type: 'group', groupId }),
      }),
      dropTargetForElements({
        element: groupInnerRef.current,
        getData: () => ({ groupId }),
        canDrop: ({ source }) => source.data.type === 'task',
        getIsSticky: () => true,
        onDragEnter: () => setIsDraggedOver(true),
        onDragLeave: () => setIsDraggedOver(false),
        onDragStart: () => setIsDraggedOver(true),
        onDrop: () => setIsDraggedOver(false),
      }),
      dropTargetForElements({
        element: groupRef.current,
        canDrop: ({ source }) => source.data.type === 'group',
        getIsSticky: () => true,
        getData: ({ input, element }) => {
          const data = { type: 'group', groupId };

          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ['left', 'right'],
          });
        },
        onDragEnter: (args) => {
          if (args.source.data.groupId !== groupId) {
            setClosestEdge(extractClosestEdge(args.self.data));
          }
        },
        onDrag: (args) => {
          if (args.source.data.groupId !== groupId) {
            setClosestEdge(extractClosestEdge(args.self.data));
          }
        },
        onDragLeave: () => setClosestEdge(null),
        onDrop: () => setClosestEdge(null),
      }),
    );
  }, [groupId]);

  return (
    <div
      className={`group ${isCollapsed ? 'collapsed' : ''}`}
      ref={groupRef}
      // style={{
      //     backgroundColor: isDraggedOver ? "lightblue" : "var(--tr-background-list)",
      // }}
      onClick={() => {
        if (isCollapsed) {
          setIsCollapsed(false);
        }
      }}
    >
      <div className="inner-group" ref={groupInnerRef}>
        <div className="top">
          <GroupName group={group} />

          <Button
            scale="ghost"
            radius="8px"
            onClick={() => setIsCollapsed(true)}
          >
            {isCollapsed ? <Icon name="expand" /> : <Icon name="collapse" />}
          </Button>

          {isCollapsed ? (
            <div className="counter">3</div>
          ) : (
            <Popover
              trigger={
                <Button scale="ghost" radius="8px">
                  <Icon size="16px" name="menuHorizontal" />
                </Button>
              }
            >
              <Button
                fullwidth="true"
                scale="ghost"
                onClick={() => console.log('clicked')}
              >
                Click me
              </Button>

              <Button as="a" scale="ghost">
                Im a link
              </Button>
            </Popover>
          )}
        </div>

        {!isCollapsed ? (
          <>
            <div className="dynamic-content">
              <div className="tasks-list">
                {tasks.map((task) => (
                  <Task key={task.id} {...task} groupId={groupId} />
                ))}
              </div>
            </div>

            {isAddingCard ? (
              <NewTask
                groupId={groupId}
                isAddingCard={isAddingCard}
                setIsAddingCard={setIsAddingCard}
              />
            ) : (
              <div className="footer">
                <Button
                  scale="ghost"
                  fullwidth="true"
                  radius="8px"
                  className="add-btn"
                  onClick={() => setIsAddingCard(true)}
                >
                  <Icon name="plus" size="16px" />
                  <span>{t('ADD_A_CARD')}</span>
                </Button>
              </div>
            )}
          </>
        ) : null}
      </div>

      {closestEdge && <DropIndicator edge={closestEdge} gap="8px" />}
    </div>
  );
};

const DropIndicator = ({ edge, gap }) => {
  const edgeClassMap = {
    left: 'edge-left',
    right: 'edge-right',
  };

  const edgeClass = edgeClassMap[edge];

  const style = {
    '--gap': gap,
  };

  return (
    <div
      className={`drop-indicator group-indicator ${edgeClass}`}
      style={style}
    ></div>
  );
};
