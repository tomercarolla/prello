import { Button, Icon, Popover } from '@ui';
import { useState } from 'react';

export function BoardCard({ title }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div
      className={`board-card ${isCollapsed ? 'collapsed' : ''}`}
      onClick={() => {
        if (isCollapsed) {
          setIsCollapsed(false);
        }
      }}
    >
      <div className="top">
        <div className="name">
          <h2>{title}</h2>
        </div>

        <Button scale="ghost" radius="8px" onClick={() => setIsCollapsed(true)}>
          {isCollapsed ? <Icon name="expand" /> : <Icon name="collapse" />}
        </Button>

        {/*todo replace to icon*/}
        {isCollapsed ? (
          <div className="counter">3</div>
        ) : (
          <Popover
            trigger={
              <Button scale="ghost" radius="8px">
                <Icon size="16px" name="menuHorizontal" />
              </Button>
            }
          >
            <Button
              fullwidth="true"
              scale="ghost"
              onClick={() => console.log('clicked')}
            >
              Click me
            </Button>

            <Button as="a" scale="ghost">
              Im a link
            </Button>
          </Popover>
        )}
      </div>
    </div>
  );
}
