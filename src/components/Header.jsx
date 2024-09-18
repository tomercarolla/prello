import { MenuOutlined, DownOutlined, QuestionCircleOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';

const dropdowns = ['Workspaces', 'Recent', 'Starred', 'Templates']

export function Header() {
    return (
        <div className='header-container'>
            <div className='header-left-side'>
                <div className='application-switcher-icon pointer'><MenuOutlined /></div>
                <div className='logo pointer'><strong>Prello</strong></div>
                <div className='drop-down-buttons-container pointer'>
                    {dropdowns.map((text, i) => <div key={i} className='drop-down-button'> {text} <DownOutlined className='arrow-down-icon' /></div>)}
                </div>
                <button className='button-create'> Create </button>
            </div>


            <div className='header-right-side'>
                <div className='input-container'>
                    <SearchOutlined className='search-icon pointer' />
                    <input className='search-bar' placeholder='Search'>
                    </input>
                </div>
                <BellOutlined className='notifications pointer' />
                <QuestionCircleOutlined className='information pointer' />
                <div className='account-initials pointer'> hi</div>
                <div ></div>
            </div>

        </div >
    )
}
