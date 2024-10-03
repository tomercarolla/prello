import * as Dialog from '@radix-ui/react-dialog';
import { Icon } from '@ui';

export function Modal({ open, onOpenChange, children, trigger }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay">
          <Dialog.Content className="modal-content">
            <div className="modal-header">
              <Dialog.Close className="close-button">
                <span>
                  <Icon name="close" size="18px" />
                </span>
              </Dialog.Close>
            </div>
            {children}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
