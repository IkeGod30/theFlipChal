import { useEffect, useRef, useState } from 'react'
import { subscribeToast } from '../utils/toast'

function Icon({ type }) {
  return type === 'error' ? (
    <svg className="toast-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="10" cy="10" r="8" />
      <path d="M10 6v5M10 14h.01" strokeLinecap="round" />
    </svg>
  ) : (
    <svg className="toast-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="10" cy="10" r="8" />
      <path d="M6.5 10.5l2.3 2.3L14 8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Toaster() {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())

  const dismiss = (id) => {
    clearTimeout(timers.current.get(id))
    timers.current.delete(id)
    setToasts((list) => list.filter((t) => t.id !== id))
  }

  useEffect(
    () =>
      subscribeToast((toastItem) => {
        setToasts((list) => [...list, toastItem])
        timers.current.set(
          toastItem.id,
          setTimeout(() => dismiss(toastItem.id), toastItem.duration),
        )
      }),
    [],
  )

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  if (toasts.length === 0) return null

  return (
    <div className="toast-region">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`} role={t.type === 'error' ? 'alert' : 'status'}>
          <Icon type={t.type} />
          <span className="toast-message">{t.message}</span>
          <button type="button" className="toast-close" aria-label="Dismiss notification" onClick={() => dismiss(t.id)}>
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
