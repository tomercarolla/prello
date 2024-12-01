import { Button, Icon } from '@ui';
import { Divider } from 'components/sidebar/StyledElements';
import styled from 'styled-components';

import { useState } from 'react';
import { updateTask } from '../../store/task/task.actions'
import { updateBoard } from 'store/board/board.actions';


const colorOptions = [
  { base: '#61BD4F', hover: '#519839' }, 
  { base: '#F2D600', hover: '#D9B51C' }, 
  { base: '#FF9F1A', hover: '#CD8313' }, 
  { base: '#EB5A46', hover: '#B04632' }, 
  { base: '#C377E0', hover: '#89609E' }, 
  { base: '#0079BF', hover: '#055A8C' }, 
  { base: '#00C2E0', hover: '#0098B7' }, 
  { base: '#51E898', hover: '#4BCE82' }, 
  { base: '#FF78CB', hover: '#C75DAE' }, 
  { base: '#344563', hover: '#091E42' }, 
];

const EditLabelView = ({ color, title, isNew,  onSave, onDelete, onCancel }) => {
  const [selectedColor, setSelectedColor] = useState(color || colorOptions[0].base);
  const [labelName, setLabelName] = useState(title || '');

  return (
    <EditLabelWrapper>
      <ColorPreview style={{ backgroundColor: selectedColor }} />
      <SearchInput
        type="text"
        placeholder="Label name"
        value={labelName}
        onChange={(e) => setLabelName(e.target.value)}
      />
      <Container>
        <label>Select a color</label>
        <ColorGrid>
          {colorOptions.map((color, index) => (
            <ColorOption
              key={index}
              color={color}
              onClick={() => setSelectedColor(color.base)}
              className={selectedColor === color.base ? 'selected' : ''}
              style={{ backgroundColor: color.base }}
            />
          ))}
        </ColorGrid>
      </Container>

      <Button
        scale="neutral"
        fullwidth="true"
        style={{ justifyContent: 'center', color: 'var(--ds-text)' }}
        onClick={() => setSelectedColor('')}
      >
        Remove Color
      </Button>

      <Divider />

      <Flex>
        <Button
          scale="neutral"
          radius="3px"
          style={{
            justifyContent: 'center',
            color: 'var(--ds-text-inverse)',
            backgroundColor: 'var(--ds-background-brand-bold)',
          }}
          onClick={() => onSave(labelName, selectedColor)}
        >
          Save
        </Button>

        <Button
          scale="neutral"
          radius="3px"
          style={{
            justifyContent: 'center',
            color: 'var(--ds-text-inverse)',
            backgroundColor: 'var(--ds-background-danger-bold)',
          }}
          onClick={onDelete}
        >
          Delete
        </Button>
      </Flex>

      <Button
        scale="neutral"
        fullwidth="true"
        style={{ justifyContent: 'center', color: 'var(--ds-text)' }}
        onClick={onCancel}
      >
        Cancel
      </Button>
    </EditLabelWrapper>
  );
};

export function LabelMenu({ task, groupId }) {
  const [editingLabel, setEditingLabel] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const board = useSelector(state => state.boardModule.board)

  const labels = board.labels || [];
  const taskLabelIds = task?.labelIds || [];

  const filteredLabels = labels.filter(label => label.title.toLowerCase().includes(searchQuery.toLowerCase()));

  async function handleLabelToggle(labelId) {
    if (!task || !board) return

    const isCurrentlySelected = taskLabelIds.includes(labelId);
    const updatedLabelIds = isCurrentlySelected
      ? taskLabelIds.filter(id => id !== labelId)
      : [...taskLabelIds, labelId];
    
    try {
      await updateTask(board._id, groupId, { ...task, labelIds: updatedLabelIds }, 'Updated task labels');
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }


  async function handleSave(title, color) {
    try {
      const updatedBoard = { ...board };

      if (editingLabel === 'new') {
        const newLabel = {
          id: utilService.makeId(),
          title,
          color,
        };
        updatedBoard.labels = [...(board.labels || []), newLabel];
      } else {
        updatedBoard.labels = board.labels.map((label) =>
          label.id === editingLabel ? { ...label, title, color } : label,
        );
      }

      await updateBoard(updatedBoard);
    } catch (error) {
      console.error('Failed to save label:', error);
    } finally {
      setEditingLabel(null);
    }
  }

  async function handleDelete() {
    if (!editingLabel || editingLabel === 'new') return;

    try {
      const updatedBoard = { ...board };

      updatedBoard.labels = board.labels.filter(
        (label) => label.id !== editingLabel,
      );

      Object.values(updatedBoard.groups).forEach((group) => {
        group.tasksIds.forEach((taskId) => {
          const task = updatedBoard.tasks[taskId];
          if (task.labelIds?.includes(editingLabel)) {
            task.labelIds = task.labelIds.filter((id) => id !== editingLabel);
          }
        });
      });

      await updateBoard(updatedBoard);
    } catch (error) {
      console.error('Failed to delete label:', error);
    } finally {
      setEditingLabel(null);
    }
  }

  function handleCancel() {
    setEditingLabel(null);
  }

  const currentLabel =
    editingLabel && editingLabel !== 'new'
      ? board.labels.find((label) => label.id === editingLabel)
      : null;


  return (
    <LabelMenuWrapper>
      {editingLabel !== null ? (
        <EditLabelView
          color={currentLabel?.color || colorOptions[0].base} 
          onSave={handleSave}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <div>
            <SearchInput
              type="text"
              placeholder="Search labels"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <StyledDiv>
            <h3>Labels</h3>
          </StyledDiv>

          <List>
            {filteredLabels.map(({ color, id, title }) => (
              <li key={id}>
                <LabelWrapper>
                  <StyledCheckbox
                    type="checkbox"
                    checked={taskLabelIds.includes(id)}
                    onChange={() => handleLabelToggle(id)}
                  />
                  <Label
                    onClick={() => handleLabelToggle(id)}
                    style={{ backgroundColor: color }}
                  >
                    {title}
                  </Label>

                  <Button
                    scale="ghost"
                    style={{ color: 'var(--ds-text)' }}
                    onClick={() => setEditingLabel(id)}
                  >
                    <Icon name="edit" size="16px" />
                  </Button>
                </LabelWrapper>
              </li>
            ))}
          </List>
          <Button
            scale="neutral"
            fullwidth="true"
            style={{ justifyContent: 'center', color: 'var(--ds-text)' }}
            onClick={() => setEditingLabel('new')}
          >
            Create a new label
          </Button>
        </>
      )}
    </LabelMenuWrapper>
  );
}




const EditLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
`;

const LabelMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--ds-surface-overlay);
  border-radius: 3px;
  margin-bottom: 5px;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 5px;
  gap: 5px;
  
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  font-size: 14px;
  color: var(--ds-text);
  border-radius: 3px;
  border: none;
  outline: none;
  background-color: var(--ds-background-input);
  box-shadow: inset 0 0 0 1px var(--ds-border-input, #091e4224);
  width: 100%;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;

  h3 {
    margin-top: 16px;
    color: var(--ds-text-subtle);
    font-size: 12px;
    font-weight: 600;
  }
`;

const List = styled.ul`
  padding: 4px 0 8px;
  list-style: none;
`;

const Label = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  margin: 0;
  padding-left: 4px;
  padding-bottom: 4px;
  height: 33px;
  border-radius: 3px;
  cursor: pointer;
`;

const StyledCheckbox = styled.input`
  appearance: none;
  width: 18px;
  height: 16px;
  border: 2px solid #dfe1e6;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease-in-out;
  z-index: 1;

  &:checked {
    background-color: #0079bf;
  }

  &:focus {
    box-shadow: 0 0 0 1px #0079bf;
  }

  &:checked::after {
    content: '✓';
    font-size: 12px;
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    animation: fadeIn 0.2s ease-in-out forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const ColorPreview = styled.div`
  width: 100%;
  height: 32px;
  border-radius: 3px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 12px;
    color: var(--ds-text-subtle);
  }
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
`;

const ColorOption = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) => props.color.base};

  &:hover {
    transform: scale(1.1);
    background-color: ${(props) => props.color.hover};
  }

  &.selected {
    box-shadow:
      0 0 0 2px white,
      0 0 0 4px var(--ds-border-focused);
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
