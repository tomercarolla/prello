import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';


import { HomePage } from './pages/homepage/HomePage.jsx';
import { BoardsPage } from './pages/BoardsPage.jsx'; 
import { Board } from './components/board/Board';
import { WorkspacePage } from './pages/WorkspacePage.jsx';

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          {/*This /boards path is identically in content to /w/:workspaceId but different in styling a litle bit but Trello keeps both of them! we need to raise this and think about it with Yonatan before we decide about it */}
          <Route path='/boards' element={<BoardsPage />} />
          <Route path='/b/:boardId/:boardName' element={<Board />} />
          <Route path='/w/:workspaceId' element={<WorkspacePage />} />

          {/* For default or some errors */}
          <Route path='*' element={<Navigate to='/home' replace />} />
        </Routes>
      </Router>
    </Provider>
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