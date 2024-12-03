import { SidebarWorkspace } from 'components/workspace/SidebarWorkspace';
import { Header } from '../components/header/Header.jsx';
import { WorkspaceContent } from '../components/workspace/WorkspaceContent.jsx';

export function WorkspacePage() {
  return (
    <>
      <Header />
      <main className="main-boards">
        <section>
            <SidebarWorkspace />
        </section>

        <section className="boards-container">
          <div className="boards-content">
            <WorkspaceContent />
          </div>
        </section>
      </main>
    </>
  );
}
