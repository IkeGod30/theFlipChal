import { useCallback, useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPrize } from '../data/prizes'
import { books } from '../data/books'
import { QUESTION_SECONDS, REVEAL_MS } from '../config'
import { answerQuestion, finishQuiz, nextQuestion, quitQuiz } from '../_actions/quiz_actions'

const LIMIT_MS = QUESTION_SECONDS * 1000

export default function QuizPage() {
  const { prizeId } = useParams()
  const prize = getPrize(prizeId)
  const session = useSelector((state) => state.quiz.session)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [msLeft, setMsLeft] = useState(LIMIT_MS)
  const startedAt = useRef(Date.now())

  const active = session?.prizeId === prizeId && session.status === 'active'
  const index = session?.index ?? 0
  const answer = session?.answers[index] // undefined while the question is open
  const locked = answer !== undefined

  const lock = useCallback(
    (choice) => {
      dispatch(answerQuestion(choice, Math.min(Date.now() - startedAt.current, LIMIT_MS)))
    },
    [dispatch],
  )

  // Countdown for the open question.
  useEffect(() => {
    if (!active || locked) return
    startedAt.current = Date.now()
    setMsLeft(LIMIT_MS)
    const id = setInterval(() => {
      const left = LIMIT_MS - (Date.now() - startedAt.current)
      if (left <= 0) {
        setMsLeft(0)
        lock(null)
      } else {
        setMsLeft(left)
      }
    }, 100)
    return () => clearInterval(id)
  }, [active, index, locked, lock])

  // After the answer is revealed, move on or finish.
  useEffect(() => {
    if (!active || !locked) return
    const id = setTimeout(() => {
      if (index + 1 < session.questions.length) dispatch(nextQuestion())
      else dispatch(finishQuiz(session))
    }, REVEAL_MS)
    return () => clearTimeout(id)
  }, [active, locked, index, session, dispatch])

  if (!prize) return <Navigate to="/" replace />
  if (session?.prizeId === prizeId && session.status === 'finished') {
    return <Navigate to={`/prize/${prizeId}/results`} replace />
  }
  if (!active) return <Navigate to={`/prize/${prizeId}`} replace /> // e.g. page refresh mid-quiz

  const question = session.questions[index]
  const secs = Math.ceil(msLeft / 1000)
  const pct = (msLeft / LIMIT_MS) * 100
  const score = session.answers.filter((a) => a.correct).length

  const quit = () => {
    dispatch(quitQuiz())
    navigate('/')
  }

  return (
    <section className="quiz">
      <div className="quiz-top">
        <button className="link" onClick={quit}>✕ Quit</button>
        <span>{session.playerName} · Score {score}</span>
      </div>

      <p className="quiz-meta">
        {prize.emoji} {prize.name} · <em>{books[prize.bookId].title}</em>
      </p>

      <div className="progress" aria-label={`Question ${index + 1} of ${session.questions.length}`}>
        {session.questions.map((_, i) => (
          <span key={i} className={i < index ? 'done' : i === index ? 'now' : ''} />
        ))}
      </div>

      <div className="timer" role="timer" aria-live="off">
        <div className={`timer-bar ${secs <= 5 ? 'low' : ''}`} style={{ width: `${pct}%` }} />
        <span className="timer-text">{secs}s</span>
      </div>

      <h2 className="question">
        <span className="qnum">Q{index + 1}/{session.questions.length}</span> {question.text}
      </h2>

      <ul className="options">
        {question.options.map((opt) => {
          let state = ''
          if (locked) {
            if (opt === question.correct) state = 'correct'
            else if (opt === answer.choice) state = 'wrong'
            else state = 'dim'
          }
          return (
            <li key={opt}>
              <button className={`option ${state}`} disabled={locked} onClick={() => lock(opt)}>
                {opt}
              </button>
            </li>
          )
        })}
      </ul>

      <p className="feedback" aria-live="polite">
        {locked && answer.choice === null && '⏱ Time’s up!'}
        {locked && answer.choice !== null && (answer.correct ? '✅ Correct!' : '❌ Not quite.')}
      </p>
    </section>
  )
}
