import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';
import { Icon } from '@ui';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';


export function Modal({ open, onOpenChange, children, trigger }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <StyledOverlay>
          <StyledContent >
            <Overlay>
            <Dialog.Title asChild>
              <VisuallyHidden>Modal</VisuallyHidden>
            </Dialog.Title>
            <StyledDescription className="sr-only"></StyledDescription>
            <CloseButton>
              <span>
                <Icon name="close" size="22px" />
              </span>
            </CloseButton>
              <ModalBody>{children}</ModalBody>
            </Overlay>
          </StyledContent>
        </StyledOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const StyledOverlay = styled(Dialog.Overlay)`
  position: fixed;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  inset: 0;
  z-index: 100;
`;

const StyledContent = styled(Dialog.Content)`
  display: flex;
  height: fit-content;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-block: 48px;

  span {
    display: flex;
  }

`;

const StyledDescription = styled(Dialog.Description)`
  display: none;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CloseButton = styled(Dialog.Close)`
  position: absolute;
  top: 10px;
  right: 25px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  color: var(--text);

  &:hover {
    background-color: var(--dynamic-button-hovered);
    border-radius: 50%;
  }
`;


const Overlay = styled.div`
  width: 765px;
  background-color: var(--surface);
  border-radius: 12px;
`;
