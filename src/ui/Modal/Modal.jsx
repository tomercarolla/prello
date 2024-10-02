import * as Dialog from '@radix-ui/react-dialog';
import { Icon } from '@ui';
import { Task } from 'components/board/components/Task';

export function Modal({ open, onOpenChange, title, children, trigger }) {
   return (
     <Dialog.Root open={open} onOpenChange={onOpenChange}>
       <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
       <Dialog.Portal>
         <Dialog.Overlay className="modal-overlay">
           <Dialog.Content className="modal-content">
             <div className="modal-header">
               <Dialog.Title>{title}</Dialog.Title>
               <Dialog.Close>
                 <Icon name="close" size="18px" />
               </Dialog.Close>
             </div>
             {children}
           </Dialog.Content>
         </Dialog.Overlay>
       </Dialog.Portal>
     </Dialog.Root>
   );
}

Modal.Trigger = Dialog.Trigger;