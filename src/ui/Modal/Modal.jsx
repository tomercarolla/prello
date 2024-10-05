import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';
import { Icon } from '@ui';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';


export function Modal({ open, onOpenChange, children, trigger }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <StyledOverlay className="modal-overlay">
          <StyledContent className="modal-content">
            <Dialog.Title asChild>
              <VisuallyHidden>Modal</VisuallyHidden>
            </Dialog.Title>
            <StyledDescription className="sr-only"></StyledDescription>
            <CloseButton>
              <span>
                <Icon name="close" scale="neutral" size="22px" />
              </span>
            </CloseButton>
            <ModalBody>{children}</ModalBody>
          </StyledContent>
        </StyledOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const StyledOverlay = styled(Dialog.Overlay)`
    display: flex;
    position: fixed;
    inset: 0; 
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
`

const StyledContent = styled(Dialog.Content)`
  display: flex;
  flex-direction: column;
  background-color: var(--surface);
  color: var(--ds-text);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 768px;
  height: 80vh;
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
`;



