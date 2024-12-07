import { Button, Icon, LabelMenu, MembersMenu, Menu } from '@ui'


export function MenuRender({
  buttonData,
  context = 'default',
  customTrigger = null,
  task,
  groupId,
  user,
  boardId
}) {
  const { name, icon, text } = buttonData;

  function renderMenuContent() {
    switch (name) {
      case 'label':
        return <LabelMenu context={context} task={task} groupId={groupId} />
      
      case 'member':
        return <MembersMenu context={context} groupId={groupId} task={task} />
      
      default:
        return <div>Menu not found</div>;
    }
  }

  const defaultTrigger = (
    <Button className="btn-nav" scale="neutral">
      <Icon name={icon} size="18px" style={{ color: 'var(--ds-text)' }} />
      {context !== 'plusIcon' && <span>{text}</span>}
    </Button>
  );

  const trigger = customTrigger || defaultTrigger;

  return (
    <div className="btn-container" style={{ position: 'relative' }}>
      <Menu trigger={trigger} title={text}>
        {renderMenuContent()}
      </Menu>
    </div>
  );
}
