import { Menu } from '@ui';

export function WorkspaceContainer({
  title,
  menuType,
  getMenuContent,
  onToggleMenu,
}) {
  return (
    <div className="workspace-container">
      <span>{title}</span>
      <div className="icons-container">
        <Menu title={title}>{getMenuContent(menuType)}</Menu>
        {/*<Button size="sm" scale="ghost" className="plus">*/}
        {/*  <Icon name="plus" size="16px" />*/}
        {/*</Button>*/}
      </div>
    </div>
  );
}
