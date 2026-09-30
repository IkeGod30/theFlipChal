import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authErrorMessage, deleteAccount } from '../_actions/auth_actions'
import { clearAvatar } from '../_actions/avatar_actions'
import { toast } from '../utils/toast'

export default function DeleteAccountDialog({ uid, onClose }) {
  const ref = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
    return () => {
      if (dialog?.open) dialog.close()
    }
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (password.length === 0 || busy) return
    setBusy(true)
    setError('')
    try {
      await deleteAccount(password)
      // Firebase's own signed-out state follows via the listener in store.js; this just
      // clears the locally-stored avatar picture, which nothing else would ever remove.
      dispatch(clearAvatar(uid))
      toast.success('Your account has been deleted.')
      navigate('/')
    } catch (err) {
      setError(authErrorMessage(err))
      setBusy(false)
    }
  }

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="del-title"
      onCancel={(e) => {
        e.preventDefault() // Esc: close through state so the dialog and page stay in sync
        if (!busy) onClose()
      }}
    >
      <h2 id="del-title">Delete account</h2>
      <p>This permanently deletes your account, your saved avatar and your login. This can’t be undone.</p>
      <form className="modal-form" onSubmit={submit}>
        <label htmlFor="confirm-password-delete">Confirm your password</label>
        <input
          id="confirm-password-delete"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />

        {error && <p className="error" role="alert">{error}</p>}

        <div className="actions">
          <button type="submit" className="btn danger" disabled={password.length === 0 || busy}>
            {busy ? 'Deleting…' : 'Delete my account'}
          </button>
          <button type="button" className="btn" onClick={onClose} disabled={busy}>Cancel</button>
        </div>
      </form>
    </dialog>
  )
}
