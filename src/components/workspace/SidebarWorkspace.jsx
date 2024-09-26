import { useState } from 'react';
import { Divider } from 'components/sidebar/StyledElements'
import { Link } from "react-router-dom";

export function SidebarWorkspace() { 
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 return (
   <>
     <nav className='sidebar-workspace'>
       <div className='top-sidebar-container'>
         <ul className='top-sidebar'>
           <li className='top-list-item'>
             <Link to='/w'>
               Boards
             </Link>
           </li>
           <li className='top-list-item'>
             <Link to='/templates'>
               Templates
             </Link>
           </li>
           <li className='top-list-item'>
             <Link to='/'>
               Home
             </Link>
           </li>
         </ul>
    </div>
    
    <Divider />

         <ul className='bottom-sidebar'>
           <div className='workspaces'>
             <span>Workspaces</span>
           </div>

           <li className='dropdown-menu-header'><div></div>Tomer test</li>
             <ul className='dropdown-menu'></ul>
         </ul>
     </nav>
   </>
 );
}