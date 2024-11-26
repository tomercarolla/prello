import { Navigate } from 'react-router-dom'
import { authService } from './services/authService.js'

export function AuthRoute({ children }) {
  const user = authService.getLoggedinUser()

  if (!user) {
    return <Navigate to="/login" replace={true} />
  }

  return children
}