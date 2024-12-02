import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { getReorderDestinationIndex } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';
import { Button, Icon } from '@ui';
import _ from 'lodash';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useDraggable } from 'react-use-draggable-scroll';
import { loadBoard, updateBoard } from '../../store/board/board.actions.js';
import { BoardProvider } from './board-context.jsx';
import { BoardHeader } from './components/BoardHeader.jsx';
import { Group } from './components/Group.jsx';

export function Board() {
  const { t } = useTranslation();
  const { boardId } = useParams();
  const board = useSelector((state) => state.boardModule.board);
  const listRef = useRef();
  const { event } = useDraggable(listRef);

  useEffect(() => {
    loadBoard(boardId);
  }, [boardId]);

  const moveTask = useCallback(
    ({
      taskIndexInStartGroup,
      sourceGroupId,
      destinationGroupId,
      itemIndexInFinishGroup,
    }) => {
      const updatedBoard = _.cloneDeep(board);
      const startGroupData = updatedBoard.groups.find(
        (group) => group.id === sourceGroupId,
      );
      const destinationGroupData = updatedBoard.groups.find(
        (group) => group.id === destinationGroupId,
      );

      const taskToMove = startGroupData.tasks.splice(
        taskIndexInStartGroup,
        1,
      )[0];

      destinationGroupData.tasks.splice(
        itemIndexInFinishGroup ?? 0,
        0,
        taskToMove,
      );

      updateBoard(updatedBoard);
    },
    [board],
  );

  const reorderTask = useCallback(
    ({ groupId, startIndex, finishIndex }) => {
      const updatedBoard = JSON.parse(JSON.stringify(board)); // Deep clone
      const groupData = updatedBoard.groups.find(
        (group) => group.id === groupId,
      );

      groupData.tasks = reorder({
        list: groupData.tasks,
        startIndex,
        finishIndex,
      });

      updateBoard(updatedBoard);
    },
    [board],
  );

  const reorderGroup = useCallback(
    ({ startIndex, finishIndex }) => {
      const updatedBoard = _.cloneDeep(board);
      updatedBoard.orderedGroupsIds = reorder({
        list: updatedBoard.orderedGroupsIds,
        startIndex,
        finishIndex,
      });

      updateBoard(updatedBoard);
    },
    [board],
  );

  useEffect(() => {
    return monitorForElements({
      onDrop: ({ source, location }) => {
        const destination = location.current.dropTargets.length;

        if (!destination) {
          return;
        }

        if (source.data.type === 'group') {
          const startIndex = board.orderedGroupsIds.findIndex(
            (columnId) => columnId === source.data.groupId,
          );

          const target = location.current.dropTargets[0];
          const sourceGroupId = target.data.groupId;

          const indexOfTarget = board.orderedGroupsIds.findIndex(
            (columnId) => columnId === target.data.groupId,
          );

          const closestEdgeOfTarget = extractClosestEdge(target.data);

          const finishIndex = getReorderDestinationIndex({
            startIndex,
            indexOfTarget,
            closestEdgeOfTarget,
            axis: 'horizontal',
          });

          return reorderGroup({
            groupId: sourceGroupId,
            startIndex,
            finishIndex,
          });
        }

        if (source.data.type === 'task') {
          const draggedTaskId = source.data.taskId;

          const [, sourceGroupRecord] = location.initial.dropTargets;

          const sourceGroupId = sourceGroupRecord.data.groupId;

          const sourceGroupData = board.groups.find(
            (group) => group.id === sourceGroupId,
          );

          const draggedTaskIndex = sourceGroupData.tasks.findIndex(
            (task) => task.id === draggedTaskId,
          );

          if (location.current.dropTargets.length === 1) {
            const [destinationGroupRecord] = location.current.dropTargets;

            const destinationGroupId = destinationGroupRecord.data.groupId;

            if (sourceGroupId === destinationGroupId) {
              const destinationIndex = getReorderDestinationIndex({
                startIndex: draggedTaskIndex,
                indexOfTarget: sourceGroupData.tasks.length - 1,
                closestEdgeOfTarget: null,
                axis: 'vertical',
              });

              reorderTask({
                groupId: sourceGroupData.groupId,
                startIndex: draggedTaskIndex,
                finishIndex: destinationIndex,
              });

              return;
            }

            return moveTask({
              taskIndexInStartGroup: draggedTaskIndex,
              sourceGroupId,
              destinationGroupId,
            });
          }

          if (location.current.dropTargets.length === 2) {
            const [destinationTaskRecord, destinationGroupRecord] =
              location.current.dropTargets;

            const destinationGroupId = destinationGroupRecord.data.groupId;
            const destinationGroup = board.groups.find(
              (group) => group.id === destinationGroupId,
            );
            const indexOfTarget = destinationGroup.tasks.findIndex(
              (task) => task.id === destinationTaskRecord.data.taskId,
            );

            const closestEdgeOfTarget = extractClosestEdge(
              destinationTaskRecord.data,
            );

            if (sourceGroupId === destinationGroupId) {
              const destinationIndex = getReorderDestinationIndex({
                startIndex: draggedTaskIndex,
                indexOfTarget,
                closestEdgeOfTarget,
                axis: 'vertical',
              });

              reorderTask({
                groupId: sourceGroupId,
                startIndex: draggedTaskIndex,
                finishIndex: destinationIndex,
              });

              return;
            }

            const destinationIndex =
              closestEdgeOfTarget === 'bottom'
                ? indexOfTarget + 1
                : indexOfTarget;

            moveTask({
              taskIndexInStartGroup: draggedTaskIndex,
              sourceGroupId,
              destinationGroupId,
              itemIndexInFinishGroup: destinationIndex,
            });
          }
        }
      },
    });
  }, [board, moveTask, reorderGroup, reorderTask]);

  return (
    <BoardProvider>
      <div className="board">
        <BoardHeader />

        <div className="canvas">
          <div ref={listRef} className="list" {...event}>
            {board &&
              board.groups.map((group) => {
                return (
                  <Group key={group.id} group={group} tasks={group.tasks} />
                );
              })}

            <div className="last-column">
              <Button scale="ghost" className="add-list-btn">
                <Icon name="plus" size="16px" />
                <span>{t('ADD_ANOTHER_LIST')}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BoardProvider>
  );
}
