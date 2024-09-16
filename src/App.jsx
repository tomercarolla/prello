import {Routes, Route} from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'

import {HomePage} from './pages/HomePage'
import {AppHeader} from "./components/AppHeader.jsx";
import { Sidebar } from './components/Sidebar.jsx';
import {Board} from "./components/board/Board.jsx";

export function App() {
    return (
        <Router>
          <div className='surface'>
            <AppHeader />

            <main>
                <div className="container">
                    <Sidebar />

                    <div className="content">
                            <Routes>
                                <Route path="/" element={<HomePage />}/>
                                <Route path="/b/:id/:boardName" element={<Board />}/>
                            </Routes>
                    </div>
                </div>
            </main>
                
          </div>
        </Router>
    )
}