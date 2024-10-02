import { useState } from 'react';
import { Modal } from 'ui/Modal/Modal';

export function TaskDetails({ task }) {
   const [open, setOpen] = useState(false);

 return (
    <Modal open={open} onOpenChange={setOpen} title='Task Details'>
       <div className='task-details-container'>
          <h2>TASK DETAILS HARD CODED</h2>
          <p>SOME HARD CODED</p>
       </div>
    </Modal>
   )
}