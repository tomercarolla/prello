import {Routes, Route} from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'

import {HomePage} from './pages/HomePage'
import {AppHeader} from "./components/AppHeader.jsx";
import { Sidebar } from './components/Sidebar.jsx';

export function App() {
    return (
        <Router>
          <div className='surface'>
            <AppHeader />
            <Sidebar />

            <main>
                <div className="container">

                    <div className="content">
                            <Routes>
                                <Route path="/" element={<HomePage />}/>
                            </Routes>
                    </div>
                </div>
                </main>
                
          </div>
        </Router>
    )
}