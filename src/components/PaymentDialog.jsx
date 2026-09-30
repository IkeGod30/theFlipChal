import { useEffect, useRef, useState } from 'react'
import { EXTRA_ATTEMPT_USD } from '../config'
import { chargeForExtraAttempt, isTestMode } from '../payments'

export default function PaymentDialog({ prize, onPaid, onCancel }) {
  const ref = useRef(null)
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
    return () => {
      if (dialog?.open) dialog.close()
    }
  }, [])

  const pay = async () => {
    setPaying(true)
    setError('')
    try {
      onPaid(await chargeForExtraAttempt(prize))
    } catch (err) {
      setError(err.message || 'The payment did not go through. Please try again.')
      setPaying(false)
    }
  }

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="pay-title"
      onCancel={(e) => {
        e.preventDefault() // Esc: close through state so the dialog and page stay in sync
        if (!paying) onCancel()
      }}
    >
      <h2 id="pay-title">Donate ${EXTRA_ATTEMPT_USD} for another attempt</h2>
      <p>
        {prize.emoji} {prize.name}: one more try at the quiz. Only your best score counts on the
        leaderboard.
      </p>
      {isTestMode && <p className="note">Test mode: no real payment is taken.</p>}
      {error && <p className="error" role="alert">{error}</p>}
      <div className="actions">
        <button type="button" className="btn primary" onClick={pay} disabled={paying}>
          {paying ? 'Processing…' : `Donate $${EXTRA_ATTEMPT_USD}`}
        </button>
        <button type="button" className="btn" onClick={onCancel} disabled={paying}>Cancel</button>
      </div>
    </dialog>
  )
}
