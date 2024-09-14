import {Routes, Route} from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'

import {HomePage} from './pages/HomePage'

export function App() {
    return (
        <div>
            <main>
                <Router>
                    <Routes>
                        <Route path="" element={<HomePage/>}/>
                    </Routes>
                </Router>
            </main>
        </div>
    )
}
