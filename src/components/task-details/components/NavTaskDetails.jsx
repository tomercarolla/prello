import styled from 'styled-components';
import { MenuRender } from 'ui/Menus/MenuRender';

export function NavTaskDetails() {
  const buttons = [
    { name: 'join', icon: 'join', text: 'Join' },
    { name: 'member', icon: 'member', text: 'Members' },
    { name: 'label', icon: 'label', text: 'Labels' },
    { name: 'checklist', icon: 'checklist', text: 'Checklist' },
    { name: 'date', icon: 'date', text: 'Dates' },
    { name: 'attachment', icon: 'attachment', text: 'Attachments' },
    { name: 'cover', icon: 'cover', text: 'Cover' },
    { name: 'customFields', icon: 'customFields', text: 'Custom Fields' },
  ];

  const actionButtons = [
    { name: 'move', icon: 'move', text: 'Move' },
    { name: 'copy', icon: 'copy', text: 'Copy' },
    { name: 'template', icon: 'template', text: 'Make template' },
    { name: 'archive', icon: 'archive', text: 'Archive' },
    { name: 'share', icon: 'share', text: 'Share' },
  ];

  return (
    <nav className="nav-task-body">
      {buttons.map((buttonData) => (
        <MenuRender key={buttonData.name} buttonData={buttonData} />
      ))}

      <CustomLabel>Actions</CustomLabel>

      {actionButtons.map((buttonData) => (
        <MenuRender key={buttonData.name} buttonData={buttonData} />
      ))}
    </nav>
  );
}

const CustomLabel = styled.div`
  font-size: 12px;
  margin-inline-start: 7px;
  margin-block: 10px 4px;
`;
