import { Button, Icon, Menu } from "@ui";
import { LabelMenu } from "./LabelMenu";
import { MembersMenu } from "./MembersMenu";

const MenuComponents = {
  label: LabelMenu,
  member: MembersMenu, 
};

export function MenuRender({
  buttonData,
  context = 'default',
  customTrigger = null,
}) {
  const { name, icon, text } = buttonData;

  function renderMenuContent() {
    switch (name) {
      case 'label':
        return <LabelMenu context={context} />;
      case 'member':
        return <MembersMenu context={context} />;
      default:
        const MenuContent = MenuComponents[name];

        return MenuContent ? (
          <MenuContent context={context} />
        ) : (
          <div>Menu not found</div>
        );
    }
  }

  const defaultTrigger = (
    <Button className="btn-nav" scale="neutral">
      <Icon name={icon} size="18px" style={{ color:'var(--ds-text)' }} />
      {context !== 'plusIcon' && <span>{text}</span>}
    </Button>
  );

  const trigger = customTrigger || defaultTrigger

  function getMenuTitle() {
    switch (name) {
      case 'label':
        return 'Labels'

      case 'member':
        return 'Members'

      default:
        return text
    }
  }

  return (
    <div className="btn-container" style={{ position: 'relative' }}>
      <Menu trigger={trigger} title={getMenuTitle()}>
        {renderMenuContent()}
      </Menu>
    </div>
  );
}
