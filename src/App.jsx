import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import { AuthRoute } from './auth.utls.jsx';
import { store } from './store/store.js';

// ------PAGES------
import { WorkspacePage } from 'pages/WorkspacePage.jsx';
import { HomePage } from './pages/homepage/HomePage.jsx';

// ------COMPONENTS------
import { TaskDetails } from 'components/task-details/TaskDetails.jsx';
import { Board } from './components/board/Board';
import { Header } from './components/header/Header.jsx';
import { Sidebar } from './components/sidebar/Sidebar.jsx';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/*"
          element={
            <Provider store={store}>
              <AuthRoute>
                <Routes>
                  <Route path="w" element={<WorkspacePage />} />
                  <Route
                    path="*"
                    element={
                      <div
                        className="surface"
                        style={{ backgroundColor: 'rgb(75, 191, 107)' }}
                      >
                        <Header />
                        <main>
                          <div className="container">
                            <Sidebar />
                            <div className="content">
                              <Routes>
                                <Route
                                  path="b/:boardId/:boardName"
                                  element={<Board />}
                                />
                                <Route
                                  path="c/:taskId/:taskName"
                                  element={<TaskDetails />}
                                />
                              </Routes>
                            </div>
                          </div>
                        </main>
                      </div>
                    }
                  />
                </Routes>
              </AuthRoute>
            </Provider>
          }
        />
      </Routes>
    </Router>
  );
}
