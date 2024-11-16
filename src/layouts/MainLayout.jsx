import { Header } from '../components/header/Header'
import { Sidebar } from '../components/sidebar/Sidebar'

export function MainLayout({ children }) {
  return (
    <div className="surface" style={{ backgroundColor: 'rgba(75, 191, 107' }}>
      <Header />
      <main>
        <div className="container">
          <Sidebar />
          <div className="content">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}