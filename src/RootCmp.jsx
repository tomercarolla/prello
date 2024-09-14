import React from 'react'
import {Routes, Route} from 'react-router'

import {HomePage} from './pages/HomePage'

export function RootCmp() {
    return (
        <div>
            <main>
                <Routes>
                    <Route path="" element={<HomePage/>}/>
                </Routes>
            </main>
        </div>
    )
}


