import { MenuOutlined, DownOutlined, QuestionCircleOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';

const dropdowns = ["Workspaces", "Recent", "Starred", "Templates"]

export function Header() {
    return (
        <div className="header-container">
            <div className='header-left-side'>
                <div className="application-switcher-icon"><MenuOutlined /></div>
                <div className="logo"><strong>Prello</strong></div>
                {dropdowns.map((text, i) => <div key={i} className='drop-down-button'> {text} <DownOutlined /></div>)}
                <button className='button-create'> Create </button>
            </div>


            <div className='header-right-side'>
                <div className='input-container'>
                    <SearchOutlined className='search-icon' />
                    <input className='search-bar' placeholder='Search'>
                    </input>
                </div>
                <BellOutlined className='notifications' />
                <QuestionCircleOutlined className='information' />
                <div className='account-initials'> hi</div>
                <div ></div>
            </div>

        </div >
    )
}
