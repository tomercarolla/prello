import {Routes, Route} from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'

import {HomePage} from './pages/HomePage'
import {AppHeader} from "./components/AppHeader.jsx";

export function App() {
    return (
        <div className='surface'>
            <AppHeader />

            <main>
                <div className="container">
                    <div className="nav" style={{backgroundColor: 'red'}}>nav here</div>

                    <div className="content">
                        <Router>
                            <Routes>
                                <Route path="/" element={<HomePage />}/>
                            </Routes>
                        </Router>
                    </div>
                </div>
            </main>
        </div>
    )
}