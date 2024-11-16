import { Route } from 'react-router-dom';
import { HomePage } from '../pages/homepage/HomePage';
import { WorkspacePage } from '../pages/WorkspacePage';
import { Board } from '../components/board/Board';
import { TaskDetails } from '../components/taskDetails/TaskDetails';
import { MainLayout } from '../layouts/MainLayout';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { AuthRoute } from '../auth.utls';

const routes = [
  {
    path: '/',
    component: HomePage,
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
  }
]

function renderRoutes(routes) {
  return routes.map(route => {
    const Component = route.component
    const Layout = route.layout

    let element = <Component />
    if (Layout) {
      element = <Layout>{element}</Layout>
    }

    if (route.protected) {
      element = (
        <Provider store={store}>
          <AuthRoute>{element}</AuthRoute>
        </Provider>
      )
    }

    return (
      <Route
        key={route.path}
        path={route.path}
        element={element}
      >
        {route.children && renderRoutes(route.children)}
      </Route>
    )
  })
}

export { renderRoutes, routes }