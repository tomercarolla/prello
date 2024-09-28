import { Header } from "components/Header";
import { SidebarWorkspace } from "components/workspace/SidebarWorkspace";
import { WorkspaceContent } from "components/workspace/WorkspaceContent";


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
         <div className="boards-content">
           <WorkspaceContent />
         </div>
       </section>

    
     </main>
   </>
 )
}