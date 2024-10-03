import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import { AuthRoute } from './auth.utls.jsx';
import { store } from './store/store.js';

// ------PAGES------
import { WorkspacePage } from 'pages/WorkspacePage.jsx';
import { HomePage } from './pages/homepage/HomePage.jsx';

// ------COMPONENTS------
import { Board } from './components/board/Board';
import { Header } from './components/header/Header.jsx';
import { Sidebar } from './components/sidebar/Sidebar.jsx';
import { TaskDetails } from 'components/taskDetails/TaskDetails.jsx';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
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
                                <Route path="b/:boardId/:boardName" element={<Board />} />
                                <Route path="c/:taskId/:taskName" element={<TaskDetails />} />
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

// -----------------------------------------------------------------------------------------

// Version for later with Authentication:

//  <Routes>
//    {/* Public routes */}
//    <Route path='/' element={<Navigate to='/home' replace />} />
//    <Route path='/home' element={<HomePage />} />
//    <Route path='/login' element={<LoginPage />} />
//    <Route path='/register' element={<RegisterPage />} />

//    {/* Protected routes */}

//    Makinng some logic for Auth or !Auth and handle it in this ProtectedRoute component...if Auth then go to the route, if not go to login page, use Redux to check state of Auth --- but this for later implementation

//    <Route element={<ProtectedRoute />}>
//      <Route path='/u/:username/boards' element={<BoardsPage />} />
//      <Route path='/b/:boardId/:boardName' element={<Board />} />
//      <Route path='/w/:workspaceId' element={<WorkspacePage />} />
//    </Route>

//    {/* Catch-all */}
//    <Route path='*' element={<Navigate to='/home' replace />} />
//  </Routes>;
