import styled from 'styled-components';
import { MenuRender } from 'ui/Menus/MenuRender';
import { JoinButton } from './JoinButton.jsx';

export function NavTaskDetails({ task, groupId, user, boardId }) {
  const buttons = [
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
    <ul className="nav-task-body">
      <li>
        <JoinButton task={task} groupId={groupId} />
      </li>

      {buttons.map((buttonData) => (
        <MenuRender
          key={buttonData.name}
          buttonData={buttonData}
          task={task}
          groupId={groupId}
          boardId={boardId}
          user={user}
        />
      ))}

      <CustomLabel>Actions</CustomLabel>

      {actionButtons.map((buttonData) => (
        <MenuRender
          key={buttonData.name}
          buttonData={buttonData}
          task={task}
          groupId={groupId}
        />
      ))}
    </ul>
  );
}

const CustomLabel = styled.div`
  font-size: 12px;
  margin-block-start: 10px;
`;
