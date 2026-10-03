import { Link, Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getPrize } from '../data/prizes'
import { attemptsRemaining, selectAttemptRecord, selectEntries } from '../_reducers'
import { formatTime } from '../utils/quiz'
import Leaderboard from '../components/Leaderboard'

export default function ResultsPage() {
  const { prizeId } = useParams()
  const result = useSelector((state) => state.quiz.lastResult)
  // The country the quiz was actually taken in, not whatever the visitor's setting is now.
  const countryCode = result?.countryCode
  const prize = getPrize(prizeId, countryCode)
  const playerKey = useSelector((state) => state.quiz.session?.playerKey)
  const entries = useSelector((state) => selectEntries(state, countryCode, prizeId))
  const record = useSelector((state) => selectAttemptRecord(state, countryCode, prizeId, playerKey))

  if (!prize || result?.prizeId !== prizeId) return <Navigate to={`/prize/${prizeId}`} replace />

  const playerName = result.name
  const rank = entries.findIndex((e) => e.name.toLowerCase() === playerName.toLowerCase()) + 1
  const leading = rank === 1
  const message =
    result.score === 10 ? 'Flawless!' : result.score >= 7 ? 'Great reading!' : result.score >= 4 ? 'Not bad.' : 'Time to re-read.'

  const used = attemptsRemaining(record) <= 0

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
      <p className="note">
        Highest score wins. Ties go to the faster total time.
        {used && ' You’ve used your one attempt on this prize.'}
      </p>

      <div className="actions">
        <Link className="btn" to="/">Back to prizes</Link>
      </div>
    </section>
  )
}
