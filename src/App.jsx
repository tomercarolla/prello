import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

import { HomePage } from './pages/HomePage';
import { Board } from './components/board/Board';

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route path='/home' element={<HomePage />} />
          {/* <Route path='/board/*' element={<Board />} /> */}
        </Routes>
      </Router>
    </Provider>
  );
}
