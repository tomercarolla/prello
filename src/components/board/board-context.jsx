import { createContext, useContext, useState } from 'react';
import { useParams } from 'react-router';

const BoardValues = {
  boardId: '',
  setBoardId: () => {},
  groupId: '',
  setGroupId: () => {},
  taskId: '',
  setTaskId: () => {},
};

const BoardContext = createContext(BoardValues);

export const useBoardContext = () => useContext(BoardContext);

export const BoardProvider = ({ children }) => {
  const { boardId } = useParams();
  const [groupId, setGroupId] = useState('');
  const [taskId, setTaskId] = useState('');

  return (
    <BoardContext.Provider
      value={{
        boardId,
        groupId,
        setGroupId,
        taskId,
        setTaskId,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
