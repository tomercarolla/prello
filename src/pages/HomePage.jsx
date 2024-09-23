
import { Link } from 'react-router-dom';

import { Icon } from 'ui/icons/Icon';

export function HomePage() {
    return (
      <>
        <header className='header'>
          <nav className='home-nav'>
            <Link to='/home' className='logo-link'>
                
            </Link>
            <div className='btns'>
              <button className='home-btn'>
                Features
                <span>
                  <Icon name='chevronDown' size='16px'/>
                </span>
              </button>
              <button className='home-btn'>Solutions</button>
              <button className='home-btn'>plans</button>
              <button className='home-btn'>Pricing</button>
              <button className='home-btn'>Resources</button>
            </div>
            <div>
              <Link to='/board'>Go to Boards</Link>
            </div>
          </nav>
        </header>
      </>
    );
}

