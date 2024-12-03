import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../auth.utls';
import { Board } from '../components/board/Board';
import { TaskDetails } from '../components/task-details/TaskDetails.jsx';
import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../pages/homepage/HomePage';
import { LoginPage } from '../pages/LoginSignupPage/LoginPage';
import { SignupPage } from '../pages/LoginSignupPage/SignupPage';
import { WorkspacePage } from '../pages/WorkspacePage';
import { store } from '../store/store';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/signup',
    component: SignupPage,
  },
  {
    path: '/workspace',
    component: WorkspacePage,
    protected: true,
  },
  {
    path: '/board/:boardId/:boardName',
    component: Board,
    protected: true,
    layout: MainLayout,
  },
  {
    path: '/c/:taskId/:taskName',
    component: TaskDetails,
    protected: true,
    layout: MainLayout,
  },
];

function renderRoutes(routes) {
  return routes.map((route) => {
    const Component = route.component;
    const Layout = route.layout;

    let element = <Component />;
    if (Layout) {
      element = <Layout>{element}</Layout>;
    }

    if (route.protected) {
      element = (
        <Provider store={store}>
          <AuthRoute>{element}</AuthRoute>
        </Provider>
      );
    }

    return (
      <Route key={route.path} path={route.path} element={element}>
        {route.children && renderRoutes(route.children)}
      </Route>
    );
  });
}

export { renderRoutes, routes };
