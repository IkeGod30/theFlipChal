import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPrize } from '../data/prizes'
import { books } from '../data/books'
import { EXTRA_ATTEMPT_USD, FREE_ATTEMPTS, QUESTION_SECONDS } from '../config'
import { addAttemptCredit, startQuiz } from '../_actions/quiz_actions'
import { attemptsRemaining, selectAttemptRecord, selectEntries, selectUser } from '../_reducers'
import Leaderboard from '../components/Leaderboard'
import PaymentDialog from '../components/PaymentDialog'

export default function IntroPage() {
  const { prizeId } = useParams()
  const prize = getPrize(prizeId)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const entries = useSelector((state) => selectEntries(state, prizeId))
  const user = useSelector(selectUser)
  const record = useSelector((state) => selectAttemptRecord(state, prizeId, user?.uid))
  const [paying, setPaying] = useState(false)

  if (!prize) return <Navigate to="/" replace />
  if (!user) return null // RequireAuth is redirecting; avoid a flash of this page's content

  const book = books[prize.bookId]
  const playerName = user.displayName || user.email
  const remaining = attemptsRemaining(record)
  const needsPayment = remaining <= 0

  const begin = () => {
    dispatch(startQuiz(prize.id, prize.bookId, playerName, user.uid))
    navigate(`/prize/${prize.id}/quiz`)
  }

  const start = () => {
    if (needsPayment) setPaying(true)
    else begin()
  }

  const onPaid = () => {
    dispatch(addAttemptCredit(prize.id, user.uid))
    setPaying(false)
    begin()
  }

  return (
    <section className="intro">
      <Link className="link" to="/">← All prizes</Link>

      <div
        className="intro-art"
        style={{ background: `linear-gradient(135deg, ${prize.colors[0]}, ${prize.colors[1]})` }}
      >
        <span className="prize-emoji">{prize.emoji}</span>
      </div>
      <h2>{prize.name} <span className="value">{prize.value}</span></h2>
      <p className="sub">
        Answer 10 questions on <em>{book.title}</em> by {book.author}. You get {QUESTION_SECONDS} seconds
        per question. Highest score wins, and ties go to the faster total time.
      </p>
      <p className="sub">
        You get {FREE_ATTEMPTS} free attempt. Want another? Donate ${EXTRA_ATTEMPT_USD} for each extra try.
      </p>

      <p className="note">
        Playing as <strong>{playerName}</strong>. {remaining > 0
          ? `You have ${remaining} attempt${remaining === 1 ? '' : 's'} left on this prize.`
          : `You’ve used your attempts on this prize. Another one is a $${EXTRA_ATTEMPT_USD} donation.`}
      </p>
      <button className="btn primary" onClick={start}>
        {needsPayment ? `Donate $${EXTRA_ATTEMPT_USD} for another attempt` : 'Start quiz'}
      </button>

      <h3>Current standings</h3>
      <Leaderboard entries={entries} />

      {paying && <PaymentDialog prize={prize} onPaid={onPaid} onCancel={() => setPaying(false)} />}
    </section>
  )
}
