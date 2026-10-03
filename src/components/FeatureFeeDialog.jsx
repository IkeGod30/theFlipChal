import { useEffect, useRef, useState } from 'react'
import { chargeAmount, isTestMode } from '../payments'
import { formatUsdAmount } from '../utils/currency'

export default function FeatureFeeDialog({ amountUsd, countryCode, bookTitle, onPaid, onCancel }) {
  const ref = useRef(null)
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState('')
  const amount = formatUsdAmount(amountUsd, countryCode)

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
      const receipt = await chargeAmount(Math.round(amountUsd * 100), `Feature request: ${bookTitle}`)
      onPaid(receipt)
    } catch (err) {
      setError(err.message || 'The payment did not go through. Please try again.')
      setPaying(false)
    }
  }

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="feature-pay-title"
      onCancel={(e) => {
        e.preventDefault() // Esc: close through state so the dialog and page stay in sync
        if (!paying) onCancel()
      }}
    >
      <h2 id="feature-pay-title">Pay {amount} processing fee</h2>
      <p>
        One-time fee to review <strong>{bookTitle}</strong> for featuring. This covers our review
        and setup; it doesn’t guarantee your book will be selected.
      </p>
      {isTestMode && <p className="note">Test mode: no real payment is taken.</p>}
      {error && <p className="error" role="alert">{error}</p>}
      <div className="actions">
        <button type="button" className="btn primary" onClick={pay} disabled={paying}>
          {paying ? 'Processing…' : `Pay ${amount}`}
        </button>
        <button type="button" className="btn" onClick={onCancel} disabled={paying}>Cancel</button>
      </div>
    </dialog>
  )
}
