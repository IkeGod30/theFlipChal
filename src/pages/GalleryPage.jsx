import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { prizes, getPrize } from '../data/prizes'
import { books } from '../data/books'
import { selectEntries } from '../_reducers'
import Leaderboard from '../components/Leaderboard'

export default function GalleryPage() {
  const leaderboard = useSelector((state) => state.leaderboard)
  const [selectedId, setSelectedId] = useState(null)
  const selected = getPrize(selectedId)
  const entries = useSelector((state) => selectEntries(state, selectedId))

  return (
    <>
      <header className="hero">
        <h1>The Flip Challenge</h1>
        <p>
          Pick a prize. Answer 10 timed questions from a featured book. Whoever scores highest
          wins it.
        </p>
      </header>

      <div className="gallery-layout">
        <ul className="gallery">
          {prizes.map((prize) => {
            const book = books[prize.bookId]
            const leader = leaderboard[prize.id]?.[0]
            return (
              <li key={prize.id}>
                <button
                  type="button"
                  className={`prize-card${prize.id === selectedId ? ' selected' : ''}`}
                  aria-pressed={prize.id === selectedId}
                  onClick={() => setSelectedId(prize.id)}
                >
                  <span
                    className="prize-art"
                    style={{ background: `linear-gradient(135deg, ${prize.colors[0]}, ${prize.colors[1]})` }}
                    aria-hidden="true"
                  >
                    <span className="prize-emoji">{prize.emoji}</span>
                    <span className="prize-value">{prize.value}</span>
                  </span>
                  <span className="prize-body">
                    <span className="prize-name">{prize.name}</span>
                    <span className="prize-tagline">{prize.tagline}</span>
                    <span className="prize-book">
                      Quiz: <em>{book.title}</em> by {book.author}
                    </span>
                    <span className="prize-leader">
                      {leader ? `🏆 Leading: ${leader.name} (${leader.score}/10)` : 'No score yet. Be the first!'}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <aside className="rankings" aria-live="polite">
          {selected ? (
            <>
              <h2>{selected.emoji} {selected.name}</h2>
              <p className="sub">Rankings</p>
              <Leaderboard entries={entries} />
              <p className="note">Highest score wins. Ties go to the faster total time.</p>
              <Link className="btn primary" to={`/prize/${selected.id}`}>Take the challenge</Link>
            </>
          ) : (
            <>
              <h2>Rankings</h2>
              <p className="empty">Click a prize to see who’s leading it.</p>
            </>
          )}
        </aside>
      </div>
    </>
  )
}
