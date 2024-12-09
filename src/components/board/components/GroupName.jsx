import { useEffect, useRef, useState } from 'react';
import { updateGroup } from '../../../store/group/group.actions.js';
import { useBoardContext } from '../board-context.jsx';

export function GroupName({ group }) {
  const [columnName, setColumnName] = useState(group.title);
  const [showTextArea, setShowTextArea] = useState(false);
  const textareaRef = useRef(null);
  const { boardId } = useBoardContext();

  useEffect(() => {
    if (showTextArea && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [showTextArea]);

  return (
    <div role="textbox" className="name" onClick={() => setShowTextArea(true)}>
      {showTextArea ? (
        <textarea
          rows="1"
          ref={textareaRef}
          value={columnName}
          maxLength="512"
          onChange={(e) => setColumnName(e.target.value)}
          onBlur={async () => {
            if (columnName.trim() === '') {
              setColumnName(group.title);
            } else {
              const updatedGroup = {
                ...group,
                title: columnName,
              };

              await updateGroup(boardId, updatedGroup);
            }

            setShowTextArea(false);
          }}
        />
      ) : (
        <h2>{columnName}</h2>
      )}
    </div>
  );
}
