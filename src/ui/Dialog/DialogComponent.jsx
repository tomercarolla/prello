import * as Dialog from '@radix-ui/react-dialog';
// import Icon from 'ui/Icon/Icon.jsx';


export function DialogComponent({ task, children, isOpen, onOpenChange }) {
 <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
   <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
       <Dialog.Overlay className="DialogOverlay" />
         <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">{task.name}</Dialog.Title>
          
    
          
          <Dialog.Close asChild>
           <button className="CloseButton">
            {/* <Icon name="close" size="16px" /> */}
           </button>
          </Dialog.Close>
         </Dialog.Content>
      </Dialog.Portal>
 </Dialog.Root>
};


