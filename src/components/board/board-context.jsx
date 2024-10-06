import { createContext, useContext, useState } from 'react';
import { useParams } from 'react-router';

const BoardValues = {
  groupId: '',
  setGroupId: () => {},
  taskId: '',
  setTaskId: () => {},
  labels: [],
  setLabels: () => {},
  showLabelText: true,
  setShowLabelText: () => {},
};

const BoardContext = createContext(BoardValues);

export const useBoardContext = () => useContext(BoardContext);

export const BoardProvider = ({ children }) => {
  const { boardId } = useParams();
  const [groupId, setGroupId] = useState('');
  const [taskId, setTaskId] = useState('');
  const [labels, setLabels] = useState([]);
  const [showLabelText, setShowLabelText] = useState(true);

  const values = {
    boardId,
    groupId,
    setGroupId,
    taskId,
    setTaskId,
    labels,
    setLabels,
    showLabelText,
    setShowLabelText,
  };

  return (
    <BoardContext.Provider value={values}>{children}</BoardContext.Provider>
  );
};
