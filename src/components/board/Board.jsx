import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {useCallback, useEffect, useRef} from "react";
import {loadBoard} from "../../store/board/board.actions.js";
import {Column} from "./components/Column.jsx";
import {reorder} from "@atlaskit/pragmatic-drag-and-drop/reorder";
import {monitorForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {getReorderDestinationIndex} from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index";
import {extractClosestEdge} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import {BoardHeader} from "./components/BoardHeader.jsx";
import { useDraggable } from "react-use-draggable-scroll";

export function Board() {
    const {boardId} = useParams();
    const board = useSelector(state => state.boardModule.board);
    const listRef = useRef();
    const { event } = useDraggable(listRef);

    const moveTask = useCallback(
        ({
             taskIndexInStartGroup,
             sourceGroupId,
             destinationGroupId,
             itemIndexInFinishGroup,
         }) => {
            const startGroupData = board.groups[sourceGroupId];
            const destinationGroupData = board.groups[destinationGroupId];
            const taskToMove = startGroupData.tasksIds[taskIndexInStartGroup];
            const newStartGroupData = {
                ...startGroupData,
                tasksIds: startGroupData.tasksIds.filter(
                    (task) => task !== taskToMove
                ),
            };
            const newDestinationTasks = destinationGroupData.tasksIds;
            const newIndexInDestination = itemIndexInFinishGroup ?? 0;

            newDestinationTasks.splice(newIndexInDestination, 0, taskToMove);

            const newFinishGroupData = {
                ...destinationGroupData,
                tasksIds: newDestinationTasks,
            };

            console.log('moveTask newStartGroupData ', newStartGroupData)
            console.log('moveTask newFinishGroupData ', newFinishGroupData)

            //todo - save board in the store
            // setBoard({
            //     ...board,
            //     [sourceGroupId]: newStartGroupData,
            //     [destinationGroupId]: newFinishGroupData,
            // });
        },
        [board]
    );

    const reorderTask = useCallback(
        ({groupId, startIndex, finishIndex}) => {
            const sourceGroupData = board.groups[groupId];

            const updatedTasks = reorder({
                list: sourceGroupData.tasksIds,
                startIndex,
                finishIndex,
            });

            const updatedSourceGroup = {
                ...sourceGroupData,
                tasksIds: updatedTasks,
            };

            console.log('reorderTask updatedSourceGroup ', updatedSourceGroup)

            //todo - save board in the store
            // setBoardData({
            //     ...board,
            //     [groupId]: updatedSourceGroup,
            // });
        },
        [board]
    );

    const reorderGroup = useCallback(
        ({startIndex, finishIndex}) => {
            const updatedGroups = reorder({
                list: board.orderedGroupsIds,
                startIndex,
                finishIndex,
            });

            const updatedSourceGroup = {
                ...board,
                orderedGroupsIds: updatedGroups,
            };

            console.log('updatedSourceGroup ', updatedSourceGroup)

            //todo - save board in the store
            // setBoardData({
            //     ...board,
            //     [groupId]: updatedSourceGroup,
            // });
        },
        [board]
    );

    useEffect(() => {
        loadBoard(boardId);
    }, [boardId]);

    useEffect(() => {
        return monitorForElements({
            onDrop: ({source, location}) => {
                const destination = location.current.dropTargets.length;

                if (!destination) {
                    return;
                }

                if (source.data.type === "group") {
                    const startIndex = board.orderedGroupsIds.findIndex(
                        (columnId) => columnId === source.data.groupId
                    );

                    const target = location.current.dropTargets[0];
                    const sourceGroupId = target.data.groupId;

                    const indexOfTarget = board.orderedGroupsIds.findIndex(
                        (columnId) => columnId === target.data.groupId
                    );

                    const closestEdgeOfTarget = extractClosestEdge(
                        target.data
                    );

                    const finishIndex = getReorderDestinationIndex({
                        startIndex,
                        indexOfTarget,
                        closestEdgeOfTarget,
                        axis: "horizontal",
                    });

                    return reorderGroup({
                        groupId: sourceGroupId,
                        startIndex,
                        finishIndex
                    });
                }

                if (source.data.type === "task") {
                    const draggedTaskId = source.data.taskId;

                    const [, sourceGroupRecord] = location.initial.dropTargets;

                    const sourceGroupId = sourceGroupRecord.data.groupId;

                    const sourceGroupData = board.groups[sourceGroupId];

                    const draggedTaskIndex = sourceGroupData.tasksIds.findIndex(
                        (task) => task === draggedTaskId
                    );

                    if (location.current.dropTargets.length === 1) {
                        const [destinationGroupRecord] = location.current.dropTargets;

                        const destinationGroupId = destinationGroupRecord.data.groupId;

                        if (sourceGroupId === destinationGroupId) {
                            const destinationIndex = getReorderDestinationIndex({
                                startIndex: draggedTaskIndex,
                                indexOfTarget: sourceGroupData.tasksIds.length - 1,
                                closestEdgeOfTarget: null,
                                axis: "vertical",
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

                        const destinationGroup = board.groups[destinationGroupId];

                        const indexOfTarget = destinationGroup.tasksIds.findIndex(
                            (task) => task === destinationTaskRecord.data.taskId
                        );

                        const closestEdgeOfTarget = extractClosestEdge(
                            destinationTaskRecord.data
                        );

                        if (sourceGroupId === destinationGroupId) {
                            const destinationIndex = getReorderDestinationIndex({
                                startIndex: draggedTaskIndex,
                                indexOfTarget,
                                closestEdgeOfTarget,
                                axis: "vertical",
                            });

                            reorderTask({
                                groupId: sourceGroupId,
                                startIndex: draggedTaskIndex,
                                finishIndex: destinationIndex,
                            });

                            return;
                        }

                        const destinationIndex =
                            closestEdgeOfTarget === "bottom"
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
        <div className='board'>
            <BoardHeader/>
            <div className="canvas">
                <div ref={listRef} className='list' {...event}>
                    {board && Object.values(board.orderedGroupsIds).map((groupId) => {
                        const group = board.groups[groupId];
                        const tasks = group.tasksIds.map((taskId) => board.tasks[taskId]);

                        return <Column key={group.id} groupId={group.id} title={group.title} tasks={tasks}/>;
                    })}
                </div>
            </div>
        </div>
    )
}