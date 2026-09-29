import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logOut } from '../_actions/auth_actions'
import { selectAuthStatus, selectUser } from '../_reducers'
import { toast } from '../utils/toast'

function Logo() {
  return (
    <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="currentColor" />
      {/* open book resting pages */}
      <path d="M6 9.5c3.5-1 7-.6 10 1.5v13c-3-2-6.5-2.4-10-1.5z" fill="var(--accent-text)" opacity=".55" />
      <path d="M26 9.5c-3.5-1-7-.6-10 1.5v13c3-2 6.5-2.4 10-1.5z" fill="var(--accent-text)" opacity=".55" />
      {/* pages flipping from right to left, staggered */}
      <path className="flip-page" d="M26 9.5c-3.5-1-7-.6-10 1.5v13c3-2 6.5-2.4 10-1.5z" fill="var(--accent-text)" />
      <path className="flip-page late" d="M26 9.5c-3.5-1-7-.6-10 1.5v13c3-2 6.5-2.4 10-1.5z" fill="var(--accent-text)" />
    </svg>
  )
}

export default function NavBar() {
  const status = useSelector(selectAuthStatus)
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  // logOut() calls Firebase directly (see auth_actions.js) — the store picks up the change
  // through the onAuthStateChanged listener in store.js, not through a dispatch here.
  const handleLogOut = async () => {
    await logOut()
    toast.success('You’ve been logged out.')
    navigate('/')
  }

  return (
    <nav className="navbar" aria-label="Main">
      <Link className="brand" to="/" aria-label="The Flip Challenge home">
        <Logo />
        <span className="brand-name">The Flip Challenge</span>
      </Link>
      <div className="nav-links">
        <NavLink to="/how-to-win">How to Win</NavLink>
        <NavLink to="/feature-a-book">Feature a book</NavLink>
        {status === 'signed-in' ? (
          <>
            <span className="nav-user" title={user.email}>{user.displayName || user.email}</span>
            <button type="button" className="nav-btn" onClick={handleLogOut}>Log out</button>
          </>
        ) : status === 'signed-out' ? (
          <>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/signup" className="nav-cta">Sign up</NavLink>
          </>
        ) : null}
      </div>
    </nav>
  )
}
