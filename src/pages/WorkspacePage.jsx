import {SidebarWorkspace} from "components/workspace/SidebarWorkspace";
import {Header} from "../components/header/Header.jsx";


export function WorkspacePage() {
    return (
        <>
            <Header/>

            <main className='main-boards'>
                {/* I think we need to make a different Sidebar for this page. There are diffrences in the sidebars. */}
                <section>
                    <nav className='navbar'>
                        <SidebarWorkspace/>
                    </nav>
                </section>

                <section className='boards-container'>
                    <div className="boards-content"></div>
                </section>
            </main>
        </>
    )
}