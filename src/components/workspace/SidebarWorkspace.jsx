import { useState } from 'react';
import { Divider } from 'components/sidebar/StyledElements'
import { Link } from "react-router-dom";
import { Icon } from '@ui';

export function SidebarWorkspace() {
 const [isMenuOpen, setIsMenuOpen] = useState(false)


 function toggleMenu() {
   setIsMenuOpen(!isMenuOpen)
 }

 const topSidebarItems = [
   { name: 'Boards', icon: 'board'},
   { name: 'Templates', icon: 'template'},
   { name: 'Home', icon: 'board'},
 ];

 const dropDownmenuItems = [
   { name: 'Boards', icon: 'board' },
   { name: 'Collections', icon: 'collections' },
   { name: 'Highlights', icon: 'heart' },
   { name: 'Views', icon: 'views' },
   { name: 'Members', icon: 'members' },
   { name: 'Settings', icon: 'settings' },
 ];

 return (
   <>
     <nav className='sidebar-workspace'>
       <div className='top-sidebar-container'>
         <ul className='top-sidebar'>
           {topSidebarItems.map((item) => (
             <li
               key={item.name}
               className='top-list-item'
               tabIndex={0}
               data-active='false'
               onClick={(ev) =>
                 ev.currentTarget.setAttribute('data-active', 'true')
               }
               onBlur={(ev) =>
                 ev.currentTarget.setAttribute('data-active', 'false')
               }
             >
               <Link to='/w'>
                 <Icon name={item.icon} size='16px' />
                 <span>{item.name}</span>
               </Link>
             </li>
           ))}
         </ul>
       </div>

       <Divider />

       <ul className='bottom-sidebar'>
         <div className='workspaces'>
           <span>Workspaces</span>
         </div>

         <li onClick={toggleMenu} className='dropdown-menu-header'>
           <div className='user-info-container'>
             <div className='avatar'></div>
             <span>Tomer test</span>
           </div>
           <Icon name={`isMenuOpen ? 'chevronUp' : 'chevronDown'`} size='16px' />
         </li>

         {isMenuOpen && (
           <ul className='dropdown-menu'>
             {dropDownmenuItems.map((item) => (
               <li
                 key={item.name}
                 className='dropdown-menu-item'
                 tabIndex={0}
                 data-active='false'
                 onClick={(ev) =>
                   ev.currentTarget.setAttribute('data-active', 'true')
                 }
                 onBlur={(ev) =>
                   ev.currentTarget.setAttribute('data-active', 'false')
                 }
               >
                 <Icon name={item.icon} size='16px' />
                 <span>{item.name}</span>
               </li>
             ))}
           </ul>
         )}
       </ul>
     </nav>
   </>
 );
 }