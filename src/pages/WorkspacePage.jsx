import { Header } from "components/Header";
import { SidebarWorkspace } from "components/workspace/SidebarWorkspace";


export function WorkspacePage() {
 return (
   <>
     <header>
       <Header />
     </header>
     <main className='main-boards'>
       {/* I think we need to make a different Sidebar for this page. There are diffrences in the sidebars. */}
       <section>
         <nav className='navbar'>
         <SidebarWorkspace />
         </nav>   
       </section>

       <section className='boards-container'>
         <div className="boards-content"></div>
       </section>

    
     </main>
   </>
 )
}