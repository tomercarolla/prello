import styled from 'styled-components';

export function MembersMenu() {
  return (
    <>
    <div>
      <SearchInput type="text" placeholder="Search members" />
    </div>
    <StyledDiv>
        <h3>Card members</h3>
    </StyledDiv> 
    </>
  );
}


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
`
