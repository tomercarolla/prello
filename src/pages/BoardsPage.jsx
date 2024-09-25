import {Header} from "../components/header/Header.jsx";

export function BoardsPage() {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main className='main-boards'>
                {/* I think we need to make a different Sidebar for this page. There are diffrences in the sidebars. */}
                <section>

                    <nav className='navbar'></nav>
                </section>

                <section className='boards-container'>
                    <div className="boards-content"></div>
                </section>
            </main>
        </>
    )
}