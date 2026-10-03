import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authErrorMessage, signUp } from '../_actions/auth_actions'
import { setProfile } from '../_actions/profile_actions'
import { selectAuthStatus, selectCountryCode } from '../_reducers'
import { signupFieldsFor } from '../data/signupFields'
import { toast } from '../utils/toast'
import CountrySelect from '../components/CountrySelect'

export default function SignupPage() {
  const status = useSelector(selectAuthStatus)
  const countryCode = useSelector(selectCountryCode)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [extra, setExtra] = useState({})
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  if (status === 'signed-in') return <Navigate to={location.state?.from?.pathname || '/'} replace />

  const fields = signupFieldsFor(countryCode)
  const extraFilled = fields.every((f) => (extra[f.id] || '').trim().length > 0)
  const valid = name.trim().length > 0 && email.trim().length > 0 && password.length >= 6 && extraFilled

  const submit = async (e) => {
    e.preventDefault()
    if (!valid || busy) return
    setBusy(true)
    setError('')
    try {
      const uid = await signUp(name.trim(), email.trim(), password)
      const details = { countryCode }
      fields.forEach((f) => { details[f.id] = extra[f.id].trim() })
      dispatch(setProfile(uid, details))
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
        <CountrySelect id="signup-country" label="Country" className="signup-country" />

        <label htmlFor="name">Name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={24} placeholder="e.g. Ada" autoFocus />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />

        {fields.map((f) => (
          <div key={f.id}>
            <label htmlFor={f.id}>{f.label}</label>
            <input
              id={f.id}
              autoComplete={f.autoComplete}
              placeholder={f.placeholder}
              value={extra[f.id] || ''}
              onChange={(e) => setExtra((prev) => ({ ...prev, [f.id]: e.target.value }))}
            />
          </div>
        ))}

        {error && <p className="error" role="alert">{error}</p>}

        <button className="btn primary" disabled={!valid || busy}>{busy ? 'Creating account…' : 'Sign up'}</button>
      </form>

      <p className="note">Already have an account? <Link className="link" to="/login" state={location.state}>Log in</Link></p>
    </section>
  )
}
