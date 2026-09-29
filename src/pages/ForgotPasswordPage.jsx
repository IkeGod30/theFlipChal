import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { resetPassword } from '../_actions/auth_actions'
import { selectAuthStatus } from '../_reducers'
import { toast } from '../utils/toast'

export default function ForgotPasswordPage() {
  const status = useSelector(selectAuthStatus)
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  if (status === 'signed-in') return <Navigate to="/" replace />

  const valid = email.trim().length > 0

  const submit = async (e) => {
    e.preventDefault()
    if (!valid || busy) return
    setBusy(true)
    setError('')
    try {
      await resetPassword(email.trim())
      toast.success('Password reset email sent.')
      setSent(true)
    } catch (err) {
      // Only the address's format is worth surfacing; whether an account exists for it is not,
      // so any other failure (e.g. no such account) still lands on the same "check your inbox"
      // message rather than confirming or denying that the email is registered.
      if (err.code === 'auth/invalid-email') setError('That email address doesn’t look right.')
      else {
        toast.success('Password reset email sent.')
        setSent(true)
      }
      setBusy(false)
    }
  }

  if (sent) {
    return (
      <section className="auth">
        <h2>Check your email</h2>
        <p className="sub">
          If an account exists for {email.trim()}, we’ve sent a link to reset its password.
        </p>
        <p className="note"><Link className="link" to="/login" state={location.state}>Back to log in</Link></p>
      </section>
    )
  }

  return (
    <section className="auth">
      <h2>Reset your password</h2>
      <p className="sub">Enter your account’s email and we’ll send you a link to reset your password.</p>

      <form onSubmit={submit}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoFocus />

        {error && <p className="error" role="alert">{error}</p>}

        <button className="btn primary" disabled={!valid || busy}>{busy ? 'Sending…' : 'Send reset link'}</button>
      </form>

      <p className="note"><Link className="link" to="/login" state={location.state}>Back to log in</Link></p>
    </section>
  )
}
