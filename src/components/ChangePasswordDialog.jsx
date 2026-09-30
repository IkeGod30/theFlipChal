import { useEffect, useRef, useState } from 'react'
import { authErrorMessage, changePassword } from '../_actions/auth_actions'
import { toast } from '../utils/toast'

export default function ChangePasswordDialog({ onClose }) {
  const ref = useRef(null)
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
    return () => {
      if (dialog?.open) dialog.close()
    }
  }, [])

  const mismatch = confirm.length > 0 && next !== confirm
  const valid = current.length > 0 && next.length >= 6 && next === confirm

  const submit = async (e) => {
    e.preventDefault()
    if (!valid || busy) return
    setBusy(true)
    setError('')
    try {
      await changePassword(current, next)
      toast.success('Password changed.')
      onClose()
    } catch (err) {
      setError(authErrorMessage(err))
      setBusy(false)
    }
  }

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="pw-title"
      onCancel={(e) => {
        e.preventDefault() // Esc: close through state so the dialog and page stay in sync
        if (!busy) onClose()
      }}
    >
      <h2 id="pw-title">Change password</h2>
      <form className="modal-form" onSubmit={submit}>
        <label htmlFor="current-password">Current password</label>
        <input
          id="current-password"
          type="password"
          autoComplete="current-password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          autoFocus
        />

        <label htmlFor="new-password">New password</label>
        <input
          id="new-password"
          type="password"
          autoComplete="new-password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          placeholder="At least 6 characters"
        />

        <label htmlFor="confirm-password">Confirm new password</label>
        <input
          id="confirm-password"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        {mismatch && <p className="error">Passwords don’t match.</p>}

        {error && <p className="error" role="alert">{error}</p>}

        <div className="actions">
          <button type="submit" className="btn primary" disabled={!valid || busy}>
            {busy ? 'Saving…' : 'Save password'}
          </button>
          <button type="button" className="btn" onClick={onClose} disabled={busy}>Cancel</button>
        </div>
      </form>
    </dialog>
  )
}
