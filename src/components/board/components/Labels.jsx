import { darken, readableColor } from 'polished';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useBoardContext } from '../board-context.jsx';

export function Labels({ task }) {
  const board = useSelector((state) => state.boardModule.board);
  const { showLabelText, setShowLabelText } = useBoardContext();

  const taskLabels = board.labels.filter((label) =>
    task?.labelIds?.includes(label.id),
  );

  if (!taskLabels.length) return null;

  console.log('showLabelText ', showLabelText);

  return (
    <LabelsContainer className="labels">
      {taskLabels.map((label) => (
        <Label
          key={label.id}
          bgcolor={label.color}
          onClick={(event, prev) => {
            setShowLabelText(!prev);
            event.defaultPrevented;
          }}
        >
          {showLabelText ? label.title : null}
        </Label>
      ))}
    </LabelsContainer>
  );
}

const LabelsContainer = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-block-end: 4px;
`;

const Label = styled.div`
  display: flex;
  border-radius: 4px;
  position: relative;
  box-sizing: border-box;
  min-width: 56px;
  max-width: 100%;
  height: 16px;
  padding-inline: 8px;
  font-size: 12px;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  white-space: nowrap;

  background-color: ${({ bgcolor }) => bgcolor};
  color: ${({ bgcolor }) => readableColor(bgcolor)};

  &:hover {
    background-color: ${({ bgcolor }) => darken(0.1, bgcolor)};
  }
`;
