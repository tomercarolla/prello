import { Avatar, Button, Icon } from '@ui';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import TrelloGif from './assets/TrelloGif.gif';
import TrelloIcon from './assets/TrelloIcon.png';

export function Header() {
  const user = useSelector((state) => state.userModule.user);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <header className="header-container">
      <div className="header-left-side">
        <Icon name="applicationSwitcher" size="20px" className="pointer" />
        <Link
         to='/workspace'
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {isHovering ? (
            <img className="trello-logo-gif pointer" src={TrelloGif} alt="" />
          ) : (
            <img className="trello-logo-gif" src={TrelloIcon} alt="" />
          )}
        </Link>
        <Button radius="4px" scale="brand">
          Create
        </Button>
      </div>

      <div className="header-right-side">
        <div className="input-container">
          <Icon name="search" size="16px" className="pointer" />
          <input className="search-bar" placeholder="Search Prello" />
        </div>

        <Icon name="bell" className="pointer" size="24px" />
        <Icon name="questionMark" className="pointer" size="22px" />

        <Avatar data={user} />

        <div></div>
      </div>
    </header>
  );
}
