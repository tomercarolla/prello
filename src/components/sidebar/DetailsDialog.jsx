import styled from "styled-components";
import { Button, Icon } from "@ui";
import { Select } from 'antd';




export function DetailsDialog({ onToggle, position, type }) { 
 
 function getDialogContent() { 
  switch (type) {
    case 'workspace':
      return (
        <div>
          <div className='filter-container'>
            <StyledLabel>Filter</StyledLabel>
            <StyledSelect
              defaultValue='all'
              style={{ width: '100%' }}
              onChange={(value) => console.log(value)}
              options={[
                { value: 'all', label: 'All workspace views' },
                { value: 'created', label: 'Created by me' },
              ]}
              className='custom-select'
            />
          </div>
        </div>
      );

    case 'board':
      return (
        <div className='sort-container'>
          <StyledLabel>Sort</StyledLabel>
          <StyledSelect
            defaultValue='alphabetically'
            style={{ width: '100%' }}
            onChange={(value) => console.log(value)}
            option={[
              { value: 'alphabetically', label: 'sort alphabetically' },
              { value: 'created', label: 'sort by created date' },
            ]}
            className='custom-select'
          />
        </div>
      );

    case 'table':
    case 'calendar':
      return (
        <Button scale='dynamic' size='md' className='close-button'>
          <Icon name='trash' size="16px" color='var(--ds-text)'/>
          <span style={{color: 'var(--ds-text)'}}>Remove View</span>
        </Button>
      );
    default:
      return null;
  }
 }

  function getDialogTitle() {
    switch (type) {
      case 'workspace':
        return 'Workspace Views';
      case 'board':
        return 'Your boards';
      case 'table':
        return 'Table';
      case 'calendar':
        return 'Calendar';
      default:
        return null;
    }
  }
 return (
   <StyledSection $position={position}>
     <StyledHeader>
       <h3>{getDialogTitle()}</h3>
       <Button
         onClick={() => onToggle(position, type)}
         className='close-button'
         scale='ghost'
         size='sm'
       >
         <Icon name='close' scale='ghost' size='16px' />
       </Button>
     </StyledHeader>
     {getDialogContent()}
   </StyledSection>
 );
}


const StyledSection = styled.section`
  position: fixed;
  width: 304px;
  padding: 8px;
  font-size: 14px;
  color: var(--ds-text);
  background-color: var(--surface);
  border-color: var(--ds-border-input);
  box-shadow: var(--ds-shadow-overlay);
  border-radius: 8px;
  z-index: 10000;

   inset: ${({$position}) => {
        switch ($position) {
            case 'top':
                return '255.2px auto auto 192px;';
            case 'up':
                return '291.2px auto auto 220px';
            case 'middle':
                return '323.2px auto auto 220px';
            case 'down':
                return '360.8px auto auto 192px';
            case 'bottom':
                return '396.8px auto auto 196px';
        }
    }};
`

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px 8px 16px;
  border-bottom: 1px solid var(--ds-border);

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }

  .close-button {
    padding: 4px;
  }
`;


const StyledSelect = styled(Select)`
  .ant-select-selector {
    background-color: var(--surface) !important;
    color: var(--ds-text) !important;
    border: 1px solid transparent !important;
  }

  &:hover .ant-select-selector {
    border-color: var(--ds-border-input-hovered) !important;
  }

  .ant-select-arrow {
    color: var(--ds-text) !important;
  }

  &.ant-select-focused .ant-select-selector {
    background-color: #22272b !important;
    border-color: #579dff !important;
    color: var(--ds-text) !important;
  }

  &.ant-select-focused .ant-select-arrow {
    color: var(--ds-text) !important;
  }
`;


const StyledLabel = styled.label`
    font-size: 12px;
    font-weight: 600;

`