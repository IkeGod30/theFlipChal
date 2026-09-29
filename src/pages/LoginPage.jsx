import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authErrorMessage, logIn } from '../_actions/auth_actions'
import { selectAuthStatus } from '../_reducers'
import { toast } from '../utils/toast'

export default function LoginPage() {
  const status = useSelector(selectAuthStatus)
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  if (status === 'signed-in') return <Navigate to={location.state?.from?.pathname || '/'} replace />

  const valid = email.trim().length > 0 && password.length > 0

  const submit = async (e) => {
    e.preventDefault()
    if (!valid || busy) return
    setBusy(true)
    setError('')
    try {
      const { user } = await logIn(email.trim(), password)
      toast.success(`Welcome back, ${user.displayName || user.email}!`)
      navigate(location.state?.from?.pathname || '/', { replace: true })
    } catch (err) {
      setError(authErrorMessage(err))
      setBusy(false)
    }
  }

  return (
    <section className="auth">
      <h2>Log in</h2>
      <p className="sub">Log in to take the quiz and appear on a leaderboard.</p>

      <form onSubmit={submit}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoFocus />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Link className="link forgot" to="/forgot-password" state={location.state}>Forgot password?</Link>

        {error && <p className="error" role="alert">{error}</p>}

        <button className="btn primary" disabled={!valid || busy}>{busy ? 'Logging in…' : 'Log in'}</button>
      </form>

      <p className="note">Don’t have an account? <Link className="link" to="/signup" state={location.state}>Sign up</Link></p>
    </section>
  )
}
