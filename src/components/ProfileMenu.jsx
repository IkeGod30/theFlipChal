import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAvatar } from '../_actions/avatar_actions'
import { selectAvatar } from '../_reducers'
import { fileToAvatarDataUrl } from '../utils/avatarImage'
import { toast } from '../utils/toast'
import Avatar from './Avatar'
import ChangePasswordDialog from './ChangePasswordDialog'
import DeleteAccountDialog from './DeleteAccountDialog'

export default function ProfileMenu({ user }) {
  const [open, setOpen] = useState(false)
  const [dialog, setDialog] = useState(null) // 'password' | 'delete' | null
  const rootRef = useRef(null)
  const fileInputRef = useRef(null)
  const dispatch = useDispatch()
  const avatarSrc = useSelector((state) => selectAvatar(state, user.uid))
  const name = user.displayName || user.email

  // Close on an outside click or Escape, like any menu button is expected to.
  useEffect(() => {
    if (!open) return
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const pickAvatar = () => {
    setOpen(false)
    fileInputRef.current?.click()
  }

  const onFileChosen = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = '' // so choosing the same file again still fires onChange
    if (!file) return
    try {
      const dataUrl = await fileToAvatarDataUrl(file)
      dispatch(setAvatar(user.uid, dataUrl))
      toast.success('Avatar updated.')
    } catch (err) {
      toast.error(err.message || 'Could not use that image.')
    }
  }

  return (
    <div className="profile" ref={rootRef}>
      <button
        type="button"
        className="profile-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Avatar name={name} seed={user.uid} src={avatarSrc} />
        <span className="nav-user">{name}</span>
        <svg className="chevron" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M3 5l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="profile-menu" role="menu">
          <div className="profile-menu-heading">Account Settings</div>
          <button type="button" role="menuitem" onClick={pickAvatar}>Upload Avatar Picture</button>
          <button type="button" role="menuitem" onClick={() => { setOpen(false); setDialog('password') }}>
            Change Password
          </button>
          <hr />
          <button type="button" role="menuitem" className="danger" onClick={() => { setOpen(false); setDialog('delete') }}>
            Delete Account
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="visually-hidden"
        tabIndex={-1}
        onChange={onFileChosen}
      />

      {dialog === 'password' && <ChangePasswordDialog onClose={() => setDialog(null)} />}
      {dialog === 'delete' && <DeleteAccountDialog uid={user.uid} onClose={() => setDialog(null)} />}
    </div>
  )
}
