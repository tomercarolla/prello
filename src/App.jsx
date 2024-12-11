import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { renderRoutes, routes } from './routes/routes';
import { authService } from './services/authService.js';
import { store } from './store/store';

export function App() {
  useEffect(() => {
    const user = authService.getLoggedinUser();
    if (user) {
      store.dispatch({ type: 'SET_USER', user });
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>{renderRoutes(routes)}</Routes>
      </Router>
    </Provider>
  );
}
