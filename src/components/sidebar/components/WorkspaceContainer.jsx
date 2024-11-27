import { Menu } from '@ui';

export function WorkspaceContainer({ title, menuType, getMenuContent }) {
  return (
    <div className="workspace-container">
      <span>{title}</span>
      <div className="icons-container">
        <Menu title={title}>{getMenuContent(menuType)}</Menu>
      </div>
    </div>
  );
}
