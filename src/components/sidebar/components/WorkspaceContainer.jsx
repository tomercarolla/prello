import { Button, Menu } from '@ui';
import { Icon } from 'ui/icons/Icon';

export function WorkspaceContainer({
  title,
  menuType,
  getMenuContent,
  onToggleMenu
}) {
  return (
    <div className="workspace-container">
      <span>{title}</span>
      <div className="icons-container">
        <Menu
          trigger={
            <Button
              size="sm"
              scale="ghost"
              className="details"
              onClick={() => onToggleMenu(menuType)}
            >
              <Icon name="details" size="16px" />
            </Button>
          }
          title={title}
        >
          {getMenuContent(menuType)}
        </Menu>
        <Button size="sm" scale="ghost" className="plus">
          <Icon name="plus" size="16px" />
        </Button>
      </div>
    </div>
  );
}
