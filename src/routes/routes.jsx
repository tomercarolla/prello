import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../auth.utls';
import { Board } from '../components/board/Board';
import { TaskDetails } from '../components/task-details/TaskDetails.jsx';
import { MainLayout } from '../layouts/MainLayout';
import { Login } from '../pages/auth/login/Login.jsx';
import { Signup } from '../pages/auth/signup/Signup.jsx';
import { HomePage } from '../pages/homepage/HomePage';
import { Workspace } from '../pages/workspace/Workspace.jsx';
import { store } from '../store/store';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/workspace',
    component: Workspace,
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
