import { DownOutlined, QuestionCircleOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';
import TrelloGif from '../ui/giffs/TrelloGif.gif';
import TrelloIcon from '../ui/Icons/png-icons/TrelloIcon.png'
import { Icon } from 'ui/icons/Icon';
import { useState } from 'react';
import { Button } from '@ui';
import AccountInitials from './AccountInitials';

const dropdowns = ['Workspaces', 'Recent', 'Starred', 'Templates']

export function Header() {

    const [isHovering, setIsHovering] = useState(false);


    return (
        <div className='header-container'>
            <div className='header-left-side'>
                <Icon name='applicationSwitcher' size='20px' className='pointer' />
                <div
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {isHovering ? <img className='trello-logo-gif pointer' src={TrelloGif} alt="" /> : <img className="trello-logo-gif" src={TrelloIcon} alt="" />}
                </div>
                <div className='drop-down-buttons-container pointer'>
                    {dropdowns.map((text) =>
                        <div className='drop-down-button pointer'>
                            <div
                                onClick={() => setExpandedSidebar(!expandedSidebar)}
                            > {text}
                            </div>
                            <Icon name='arrowDown' className='arrow-down' size='16px' />
                        </div>
                    )}
                </div>
                <Button customWidth='65px' radius='4px' className='button-create' scale='brand'> Create </Button>
            </div>


            <div className='header-right-side'>
                <div className='input-container'>
                    <Icon name='search' size='16px' className='pointer' />
                    <input className='search-bar' placeholder='Search Prello'>
                    </input>
                </div>
                <Icon name='bell' className='pointer' size='24px' />
                <Icon name='questionMark' className='pointer' size='22px' />
                <AccountInitials user={{ name: 'Roy Live', userColor: '#3498db' }} />
                <div ></div>
            </div>

        </div >
    )
}
