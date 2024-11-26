import { BrowserRouter as Router, Routes } from "react-router-dom"
import { routes, renderRoutes } from "./routes/routes"
import { useEffect } from "react"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { authService } from "./services/authService.js"


export function App() {

  useEffect(() => {
    const user = authService.getLoggedinUser()
    if (user) {
      store.dispatch({ type: 'SET_USER', user })
    }
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Routes>{renderRoutes(routes)}</Routes>
      </Router>
    </Provider>
  )
}