import { Button, Icon } from '@ui';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { addGroup } from '../../../store/group/group.actions.js';

export function NewGroup({ boardId, isAddingGroup, setIsAddingGroup }) {
  const { t } = useTranslation();
  const newTaskRef = useRef(null);
  const textAreaRef = useRef(null);
  const [value, setValue] = useState('');

  const resizeTextArea = () => {
    if (!textAreaRef.current) {
      return;
    }

    textAreaRef.current.focus();
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  //eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickOutside = (event) => {
    if (newTaskRef.current && !newTaskRef.current.contains(event.target)) {
      setIsAddingGroup(false);
    }
  };

  useEffect(() => {
    resizeTextArea();
    window.addEventListener('resize', resizeTextArea);
  }, []);

  useEffect(() => {
    if (isAddingGroup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside, isAddingGroup]);

  return (
    <AddGroup>
      <div className="demo-group">
        <textarea
          rows="1"
          value={value}
          ref={textAreaRef}
          placeholder="Enter list name..."
          onChange={(e) => {
            setValue(e.target.value);
            resizeTextArea();
          }}
        />
      </div>

      <div className="actions">
        <Button
          scale="brand"
          radius="3px"
          onClick={async () => {
            if (!value) {
              setIsAddingGroup(false);
              return;
            }

            const newGroup = {
              title: value,
            };

            await addGroup(boardId, newGroup);

            setValue('');
            textAreaRef.current.focus();
          }}
        >
          <span>{t('ADD_LIST')}</span>
        </Button>

        <Button
          scale="ghost"
          radius="3px"
          className="add-btn"
          onClick={() => setIsAddingGroup(false)}
        >
          <Icon name="close" size="20px" />
        </Button>
      </div>
    </AddGroup>
  );
}

const AddGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 272px;
  padding: 8px;
  border-radius: 12px;
  background-color: var(--tr-background-list);
  box-shadow: var(
    --ds-shadow-raised,
    0px 1px 1px #091e4240,
    0px 0px 1px #091e424f
  );

  .demo-group {
    textarea {
      width: 100%;
      min-height: 20px;
      max-height: 256px;
      line-height: 20px;
      margin: 0;
      padding: 6px 12px;
      overflow: hidden;
      border-radius: 4px;
      color: var(--ds-text, #172b4d);
      font-weight: 600;
      overflow-y: auto;
      background-color: var(--ds-background-input, #fff);
      border: none;
      box-shadow: inset 0 0 0 1px var(--ds-border-input, #091e4224);
      resize: none;
      font-size: 14px;

      &:focus-within {
        outline: none;
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: default;
  }
`;
