import { BrowserRouter as Router, Routes } from "react-router-dom"
import { routes, renderRoutes } from "./routes/routes"

export function App() {
  return (
    <Router>
      <Routes>
        {renderRoutes(routes)}
      </Routes>
    </Router>
  )
}