import { Header } from "components/Header";
import { SidebarWorkspace } from "components/workspace/SidebarWorkspace";


export function WorkspacePage() {
 return (
   <>
       <Header />
     <main className='main-boards'>
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