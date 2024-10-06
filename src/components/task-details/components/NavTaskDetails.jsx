import { Button, Icon, LabelMenu, MembersMenu, Menu } from '@ui';

const MenuComponents = {
  member: MembersMenu,
  label: LabelMenu,
  // Add other menu components here
};

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

  function renderButton(buttonData) {
    const { name, icon, text } = buttonData;
    const MenuContent = MenuComponents[name];

    const trigger = (
      <Button className="btn-nav" scale="neutral">
        <Icon name={icon} size="18px" />
        <span>{text}</span>
      </Button>
    );


    
    return (
      <div
        key={name}
        className="btn-container"
        style={{ position: 'relative' }}
      >
        <Menu trigger={trigger} title={text}>
          {MenuContent ? <MenuContent /> : <div>No Content for {text}</div>}
        </Menu>
      </div>
    );
  }

  return (
    <nav className="nav-task-body">
      {buttons.map(renderButton)}
      <span style={{ marginLeft: '7px' }}>Actions</span>
      {actionButtons.map(renderButton)}
    </nav>
  );
}
