import {Routes, Route} from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'

import {HomePage} from './pages/HomePage'
import {AppHeader} from "./components/AppHeader.jsx";
import {Board} from "./components/board/Board.jsx";

export function App() {
    return (
        <div className='surface' style={{backgroundColor: 'rgb(75, 191, 107)'}}>
            <AppHeader />

            <main>
                <div className="container">
                    <div className="nav" style={{backgroundColor: 'red'}}>nav here</div>

                    <div className="content">
                        <Router>
                            <Routes>
                                <Route path="/" element={<HomePage />}/>
                                <Route path="/b/:id/:boardName" element={<Board />}/>
                            </Routes>
                        </Router>
                    </div>
                </div>
            </main>
        </div>
    )
}