import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';


import {AuthRoute} from "./auth.utls.jsx";
import {Provider} from 'react-redux';
import { store } from './store/store.js';

// ------PAGES------
import {HomePage} from './pages/homepage/HomePage.jsx';
import { WorkspacePage } from 'pages/WorkspacePage.jsx';

// ------COMPONENTS------
import {Header} from "./components/Header.jsx";
import {Sidebar} from "./components/sidebar/Sidebar.jsx";
import {Board} from './components/board/Board';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route
          path='/*'
          element={
            <Provider store={store}>
              <AuthRoute>
                <Routes>
                  <Route path='w' element={<WorkspacePage />} />
                  <Route
                    path='*'
                    element={
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
                                <Route path='b/:id/:boardName' element={<Board />} />
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