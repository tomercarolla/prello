import { Button, Icon, Popover } from '@ui';
import styled from 'styled-components';

export function Menu({ trigger, title, children }) {
  return (
    <Popover trigger={trigger}>
      <Flex>
        <Header>
          <h2>{title}</h2>

          <Button scale="ghost" radius="8px">
            <Icon size="16px" name="close" />
          </Button>
        </Header>

        <div>{children}</div>
      </Flex>
    </Popover>
  );
}

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block-start: -12px;

  h2 {
    line-height: 32px;
    height: 40px;
    padding: 4px 8px;
    font-size: 14px;
    font-weight: 600;
    color: var(--ds-text-subtle);
    flex: 1;
    text-align: center;
  }
`;
