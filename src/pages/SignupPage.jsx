import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authErrorMessage, signUp } from '../_actions/auth_actions'
import { selectAuthStatus } from '../_reducers'
import { toast } from '../utils/toast'

export default function SignupPage() {
  const status = useSelector(selectAuthStatus)
  const navigate = useNavigate()
  const location = useLocation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  if (status === 'signed-in') return <Navigate to={location.state?.from?.pathname || '/'} replace />

  const valid = name.trim().length > 0 && email.trim().length > 0 && password.length >= 6

  const submit = async (e) => {
    e.preventDefault()
    if (!valid || busy) return
    setBusy(true)
    setError('')
    try {
      await signUp(name.trim(), email.trim(), password)
      toast.success(`Welcome, ${name.trim()}! Your account is ready.`)
      navigate(location.state?.from?.pathname || '/', { replace: true })
    } catch (err) {
      setError(authErrorMessage(err))
      setBusy(false)
    }
  }

  return (
    <section className="auth">
      <h2>Create an account</h2>
      <p className="sub">You need an account to take the quiz and appear on a leaderboard.</p>

      <form onSubmit={submit}>
        <label htmlFor="name">Name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={24} placeholder="e.g. Ada" autoFocus />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />

        {error && <p className="error" role="alert">{error}</p>}

        <button className="btn primary" disabled={!valid || busy}>{busy ? 'Creating account…' : 'Sign up'}</button>
      </form>

      <p className="note">Already have an account? <Link className="link" to="/login" state={location.state}>Log in</Link></p>
    </section>
  )
}
