import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { Routes, Route } from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'

import {HomePage} from './pages/HomePage'
import {Header} from "./components/header/Header.jsx";
import {Board} from "./components/board/Board.jsx";
import { Sidebar } from 'components/sidebar/Sidebar';

export function App() {
  return (
    <Provider store={store}>
      <Router>
          <div
            className='surface'
            style={{ backgroundColor: 'rgb(75, 191, 107)' }}
          >
            <Header />

            <main>
              <div className='container'>
                <Sidebar />

                <div className='content'>
                  <Routes>
                    {/* Public Routes */}
                    <Route path='/' element={<HomePage />} />
                    {/* Private Routes */}
                    <Route path='/b/:id/:boardName' element={<Board />} />
                  </Routes>
                </div>
              </div>
            </main>
          </div>
      </Router>
    </Provider>
    );
}