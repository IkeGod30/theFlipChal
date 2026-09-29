import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPrize } from '../data/prizes'
import { EXTRA_ATTEMPT_USD } from '../config'
import { addAttemptCredit, startQuiz } from '../_actions/quiz_actions'
import { attemptsRemaining, selectAttemptRecord, selectEntries } from '../_reducers'
import { formatTime } from '../utils/quiz'
import Leaderboard from '../components/Leaderboard'
import PaymentDialog from '../components/PaymentDialog'

export default function ResultsPage() {
  const { prizeId } = useParams()
  const prize = getPrize(prizeId)
  const result = useSelector((state) => state.quiz.lastResult)
  const playerKey = useSelector((state) => state.quiz.session?.playerKey)
  const entries = useSelector((state) => selectEntries(state, prizeId))
  const record = useSelector((state) => selectAttemptRecord(state, prizeId, playerKey))
  const [paying, setPaying] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!prize || result?.prizeId !== prizeId) return <Navigate to={`/prize/${prizeId}`} replace />

  const playerName = result.name
  const rank = entries.findIndex((e) => e.name.toLowerCase() === playerName.toLowerCase()) + 1
  const leading = rank === 1
  const message =
    result.score === 10 ? 'Flawless!' : result.score >= 7 ? 'Great reading!' : result.score >= 4 ? 'Not bad.' : 'Time to re-read.'

  const needsPayment = attemptsRemaining(record) <= 0

  const begin = () => {
    dispatch(startQuiz(prize.id, prize.bookId, playerName, playerKey))
    navigate(`/prize/${prize.id}/quiz`)
  }

  const onPaid = () => {
    dispatch(addAttemptCredit(prize.id, playerKey))
    setPaying(false)
    begin()
  }

  return (
    <section className="results">
      <h2>{leading ? `🏆 You’re leading for the ${prize.name}!` : message}</h2>
      <p className="big-score">
        {result.score}<small>/10</small>
      </p>
      <p className="sub">
        {playerName}, you finished in {formatTime(result.timeMs)}.
        {rank > 1 && ` You’re currently #${rank}; beat ${entries[0].name}’s ${entries[0].score}/10 to take the prize.`}
      </p>

      <h3>{prize.emoji} {prize.name} leaderboard</h3>
      <Leaderboard entries={entries} highlight={playerName} />
      <p className="note">Highest score wins. Ties go to the faster total time.</p>

      <div className="actions">
        <button className="btn primary" onClick={needsPayment ? () => setPaying(true) : begin}>
          {needsPayment ? `Donate $${EXTRA_ATTEMPT_USD} for another attempt` : 'Try again'}
        </button>
        <Link className="btn" to="/">Back to prizes</Link>
      </div>

      {paying && <PaymentDialog prize={prize} onPaid={onPaid} onCancel={() => setPaying(false)} />}
    </section>
  )
}
