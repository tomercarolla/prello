import { Button, Icon } from '@ui';
import styled from 'styled-components';


export function LabelMenu() {
  return (
    <>
      <div>
        <SearchInput type="text" placeholder="Search members" />
      </div>
      <StyledDiv>
        <h3>Labels</h3>
      </StyledDiv>
      <List>
        <li>
          <LabelWrapper>
            <Checkbox type="checkbox" />
            <Label style={{ backgroundColor: '#216e4e' }}></Label>
            <Button scale="ghost" style={{ color: 'var(--ds-text)' }}>
              <Icon name="edit" size="16px" />
            </Button>
          </LabelWrapper>
        </li>

        <li>
          <LabelWrapper>
            <Checkbox type="checkbox" />
            <Label style={{ backgroundColor: '#7f5f01' }}></Label>
            <Button scale="ghost" style={{ color: 'var(--ds-text)' }}>
              <Icon name="edit" size="16px" />
            </Button>
          </LabelWrapper>
        </li>

        <li>
          <LabelWrapper>
            <Checkbox type="checkbox" />
            <Label style={{ backgroundColor: '#ae2e24' }}></Label>
            <Button scale="ghost" style={{ color: 'var(--ds-text)' }}>
              <Icon name="edit" size="16px" />
            </Button>
          </LabelWrapper>
        </li>

        <li>
          <LabelWrapper>
            <Checkbox type="checkbox" />
            <Label style={{ backgroundColor: '#0055cc' }}></Label>
            <Button scale="ghost" style={{ color: 'var(--ds-text)' }}>
              <Icon name="edit" size="16px" />
            </Button>
          </LabelWrapper>
        </li>
      </List>
    </>
  );
}

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 5px;
  gap:5px;
`
const Checkbox = styled.input`
`



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
`

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
`
