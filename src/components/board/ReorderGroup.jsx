import { getReorderDestinationIndex } from '@atlaskit/pragmatic-drag-and-drop-hitbox/dist/types/get-reorder-destination-index.js';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/dist/types/entry-point/element/adapter.js';
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';
import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { updateBoard } from '../../store/board/board.actions.js';

export const ReorderGroup = () => {
  const board = [];

  useEffect(() => {
    return monitorForElements({
      onDrop: ({ source, location }) => {
        const destination = location.current.dropTargets.length;

        if (!destination) {
          return;
        }

        if (source.data.type === 'group') {
          const startIndex = board.groups.findIndex(
            (group) => group.id === source.data.groupId,
          );
          const target = location.current.dropTargets[0];
          const sourceGroupId = target.data.groupId;
          const indexOfTarget = board.groups.findIndex(
            (group) => group.id === target.data.groupId,
          );

          const finishIndex = getReorderDestinationIndex({
            startIndex,
            indexOfTarget,
            axis: 'horizontal',
          });

          return reorderGroup({
            groupId: sourceGroupId,
            startIndex,
            finishIndex,
          });
        }
      },
    });
  }, [board, reorderGroup]);

  const reorderGroup = useCallback(
    ({ startIndex, finishIndex }) => {
      const updatedBoard = _.cloneDeep(board);

      updatedBoard.groups = reorder({
        list: updatedBoard.groups,
        startIndex,
        finishIndex,
      });

      updateBoard(updatedBoard);
    },
    [board],
  );
};
