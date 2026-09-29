import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuthStatus } from '../_reducers'

// Gates a route on being logged in. While Firebase reports its initial state (a beat on first
// load), we render nothing rather than bouncing a signed-in visitor through the login page.
export default function RequireAuth({ children }) {
  const status = useSelector(selectAuthStatus)
  const location = useLocation()

  if (status === 'loading') return null
  if (status === 'signed-out') return <Navigate to="/login" replace state={{ from: location }} />
  return children
}
