import { Button, Icon } from '@ui';
import { Divider } from 'components/sidebar/StyledElements';
import { useState } from 'react';
import styled from 'styled-components';

const colorOptions = [
  { base: 'var(--ds-background-accent-lime-bolder)', hover: 'var(--ds-background-accent-lime-bolder-hovered)' },
  { base: 'var(--ds-background-accent-lime-subtler)', hover: 'var(--ds-background-accent-lime-subtler-hovered)' },
  { base: 'var(--ds-background-accent-green-bolder)', hover: 'var(--ds-background-accent-green-bolder-hovered)' },
  { base: 'var(--ds-background-accent-green-subtler)', hover: 'var(--ds-background-accent-green-subtler-hovered)' },
  { base: 'var(--ds-background-accent-yellow-bolder)', hover: 'var(--ds-background-accent-yellow-bolder-hovered)' },
  { base: 'var(--ds-background-accent-yellow-subtler)', hover: 'var(--ds-background-accent-yellow-subtler-hovered)' },
  { base: 'var(--ds-background-accent-orange-subtler)', hover: 'var(--ds-background-accent-orange-subtler-hovered)' },
  { base: 'var(--ds-background-accent-orange-bolder)', hover: 'var(--ds-background-accent-orange-bolder-hovered)' },
  { base: 'var(--ds-background-accent-red-subtler)', hover: 'var(--ds-background-accent-red-subtler-hovered)' },
  { base: 'var(--ds-background-accent-red-bolder)', hover: 'var(--ds-background-accent-red-bolder-hovered)' },
  { base: 'var(--ds-background-accent-purple-subtler)', hover: 'var(--ds-background-accent-purple-subtler-hovered)' },
  { base: 'var(--ds-background-accent-purple-bolder)', hover: 'var(--ds-background-accent-purple-bolder-hovered)' },
  { base: 'var(--ds-background-accent-blue-subtler)', hover: 'var(--ds-background-accent-blue-subtler-hovered)' },
  { base: 'var(--ds-background-accent-blue-bolder)', hover: 'var(--ds-background-accent-blue-bolder-hovered)' },
  { base: 'var(--ds-background-accent-teal-bolder)', hover: 'var(--ds-background-accent-teal-bolder-hovered)' },
  { base: 'var(--ds-background-accent-teal-subtler)', hover: 'var(--ds-background-accent-teal-subtler-hovered)' },
  { base: 'var(--ds-background-accent-magenta-subtler)', hover: 'var(--ds-background-accent-magenta-subtler-hovered)' },
  { base: 'var(--ds-background-accent-magenta-bold)', hover: 'var(--ds-background-accent-magenta-bold-hovered)' },
  { base: 'var(--ds-background-accent-magenta-bolder)', hover: 'var(--ds-background-accent-magenta-bolder-hovered)' },
  { base: 'var(--ds-background-accent-gray-bolder)', hover: 'var(--ds-background-accent-gray-bolder-hovered)' },
  // { base: 'var(--ds-background-accent-gray-subtle)', hover: 'var(--ds-background-accent-gray-subtle-hovered)' },
];

const EditLabelView = ({ color, onSave, onDelete, onCancel }) => {
  const [selectedColor, setSelectedColor] = useState(color);
  const [labelName, setLabelName] = useState('');

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

export function LabelMenu() {
  const [editingLabel, setEditingLabel] = useState(null);

  const labels = [
    { color: '#216e4e', id: 1 },
    { color: '#7f5f01', id: 2 },
    { color: '#ae2e24', id: 3 },
    { color: '#0055cc', id: 4 },
  ];

  function handleEdit(id) {
    setEditingLabel(id);
  }

  function handleSave(name, color) {
    console.log('Save', name, color);
    setEditingLabel(null);
  }

  function handleDelete() {
    console.log('Delete');
    setEditingLabel(null);
  }

  function handleCancel() {
    setEditingLabel(null);
  }

  return (
      <LabelMenuWrapper>
      { editingLabel !== null ? (
        <EditLabelView
          color={labels.find(label => label.id === editingLabel)?.color}
          onSave={handleSave}
          onDelete={handleDelete}
          onCancel={handleCancel}
        /> 
        ) : (
      <>
        <div>
          <SearchInput type="text" placeholder="Search labels" />
        </div>
        <StyledDiv>
          <h3>Labels</h3>
        </StyledDiv>
        <List>
          {labels.map(({ color, id }) => (
            <li key={id}>
              <LabelWrapper>
                <StyledCheckbox type="checkbox" />
                <Label style={{ backgroundColor: color }}></Label>
                <Button
                  scale="ghost"
                  style={{ color: 'var(--ds-text)' }}
                  onClick={() => handleEdit(id)}
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
        >
          Create a new label
        </Button>
      </>
    )}
  </LabelMenuWrapper >
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
    box-shadow: 0 0 0 2px white, 0 0 0 4px var(--ds-border-focused);
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
