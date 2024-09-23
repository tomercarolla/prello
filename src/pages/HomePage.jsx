
import { Link } from 'react-router-dom';

import { Icon } from 'ui/icons/Icon';


export function HomePage() {
    return (
      <>
        <header className='header'>
          <nav className='home-nav'>
            <Link to='/home' className='logo-link'>
              <Icon name='trello' />
              <span>Prello</span>
            </Link>
            <div className='btns'>
              <button className='home-btn'>
                Features
                <Icon name='chevronDown' size='14px' />
              </button>
              <button className='home-btn'>
                Solutions
                <Icon name='chevronDown' size='14px' />
              </button>
              <button className='home-btn'>
                plans
                <Icon name='chevronDown' size='14px' />
              </button>
              <button className='home-btn'>
                Pricing
                <Icon name='chevronDown' size='14px' />
              </button>
              <button className='home-btn'>
                Resources
                <Icon name='chevronDown' size='14px' />
              </button>
            </div>
            <div className='nav-link'>
              <Link to='/board'>Go to Boards</Link>
            </div>
          </nav>
        </header>

        <main className='home-main'>
          <div className='bg'>
            <section className='content'>
              <div className='left'>
                <h1>
                  Trello brings all your tasks, teammates, and tools together
                </h1>
                <p>
                  Keep everything in the same place even if your team isn’t.
                </p>
                <form className='form'>
                  <input className='email-input' type='email' placeholder='Enter your email' />
                  <button className='email-button'>Sign up it's free!</button>
                </form>
              </div>
              <pciture className='right'>
                <img src="./src/ui/Icons/png-icons/HomeImage.png" />
              </pciture>
            </section>
          </div>
        </main>
      </>
    );
}

