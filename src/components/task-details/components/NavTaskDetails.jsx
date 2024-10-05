import { Button, Icon } from '@ui';
import { useState } from 'react';

export function NavTaskDetails() {
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    setShowMenu(!showMenu)
  };

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

 function renderButton(buttonData) {
   const { name, icon, text } = buttonData;
   return (
     <div key={name} className="btn-container">
       <Button
         className="btn-nav"
         scale="neutral"
         onClick={toggleMenu}
       >
         <Icon name={icon} size="18px" />
         <span>{text}</span>
       </Button>
     </div>
   );
 }

  return (
    <nav className="nav-task-body">
      {buttons.map(renderButton)}
      <span
        style={{ marginLeft: '7px' }}
      >
        Actions
      </span>
      {actionButtons.map(renderButton)}
    </nav>
  );
}
