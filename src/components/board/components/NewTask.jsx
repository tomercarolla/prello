import { Button, Icon } from '@ui';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadBoard } from '../../../store/board/board.actions.js';
import { addTask } from '../../../store/task/task.actions.js';
import { useBoardContext } from '../board-context.jsx';

export function NewTask({ groupId, setIsAddingCard }) {
  const { t } = useTranslation();
  const textAreaRef = useRef(null);
  const [value, setValue] = useState('');
  const { boardId } = useBoardContext();

  const resizeTextArea = () => {
    if (!textAreaRef.current) {
      return;
    }

    textAreaRef.current.focus();
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  useEffect(() => {
    resizeTextArea();
    window.addEventListener('resize', resizeTextArea);
  }, []);

  return (
    <div className="add-task">
      <div className="demo-task">
        <textarea
          rows="3"
          value={value}
          ref={textAreaRef}
          onChange={(e) => {
            setValue(e.target.value);
            resizeTextArea();
          }}
        />
      </div>

      <div className="actions">
        <Button
          paddinginline="12px"
          scale="brand"
          radius="3px"
          onClick={async () => {
            if (!value) {
              setIsAddingCard(false);
              return;
            }

            const newTask = {
              title: value,
            };

            await addTask(boardId, groupId, newTask);
            await loadBoard(boardId);

            setValue('');
            textAreaRef.current.focus();
          }}
        >
          <span>{t('ADD_CARD')}</span>
        </Button>

        <Button
          scale="ghost"
          radius="3px"
          className="add-btn"
          onClick={() => setIsAddingCard(false)}
        >
          <Icon name="close" size="20px" />
        </Button>
      </div>
    </div>
  );
}
