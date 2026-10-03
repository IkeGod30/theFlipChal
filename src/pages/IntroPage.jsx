import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPrize } from '../data/prizes'
import { books } from '../data/books'
import { FREE_ATTEMPTS, QUESTION_SECONDS } from '../config'
import { startQuiz } from '../_actions/quiz_actions'
import {
  attemptsRemaining,
  selectAttemptRecord,
  selectCountryCode,
  selectCountryInfo,
  selectEntries,
  selectUser,
} from '../_reducers'
import { formatPrizeValue } from '../utils/currency'
import Leaderboard from '../components/Leaderboard'

export default function IntroPage() {
  const { prizeId } = useParams()
  const countryCode = useSelector(selectCountryCode)
  const country = useSelector(selectCountryInfo)
  const prize = getPrize(prizeId, countryCode)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const entries = useSelector((state) => selectEntries(state, countryCode, prizeId))
  const user = useSelector(selectUser)
  const record = useSelector((state) => selectAttemptRecord(state, countryCode, prizeId, user?.uid))

  if (!prize) return <Navigate to="/" replace />
  if (!user) return null // RequireAuth is redirecting; avoid a flash of this page's content

  const book = books[prize.bookId]
  const playerName = user.displayName || user.email
  const remaining = attemptsRemaining(record)
  const used = remaining <= 0

  const start = () => {
    dispatch(startQuiz(prize.id, prize.bookId, playerName, user.uid, countryCode))
    navigate(`/prize/${prize.id}/quiz`)
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
      <h2>{prize.name} <span className="value">{formatPrizeValue(prize, countryCode)}</span></h2>
      <p className="sub">
        Answer 10 questions on <em>{book.title}</em> by {book.author}. You get {QUESTION_SECONDS} seconds
        per question. Highest score wins, and ties go to the faster total time.
      </p>
      <p className="sub">
        You get {FREE_ATTEMPTS} attempt per prize, so make it count.
      </p>
      <p className="note">Playing from {country.flag} {country.name}.</p>

      <p className="note">
        Playing as <strong>{playerName}</strong>. {used
          ? 'You’ve already used your attempt on this prize.'
          : 'You have 1 attempt left on this prize.'}
      </p>
      <button className="btn primary" onClick={start} disabled={used}>
        {used ? 'Attempt used' : 'Start quiz'}
      </button>

      <h3>Current standings</h3>
      <Leaderboard entries={entries} />
    </section>
  )
}
