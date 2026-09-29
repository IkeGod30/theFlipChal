import { formatTime } from '../utils/quiz'

export default function Leaderboard({ entries, highlight }) {
  if (entries.length === 0) {
    return <p className="empty">No scores yet. Yours could be the first.</p>
  }
  return (
    <ol className="leaderboard">
      {entries.slice(0, 10).map((e, i) => (
        <li key={e.name} className={e.name.toLowerCase() === highlight?.toLowerCase() ? 'me' : ''}>
          <span className="rank">{i === 0 ? '🏆' : i + 1}</span>
          <span className="who">{e.name}</span>
          <span className="pts">{e.score}/10</span>
          <span className="time">{formatTime(e.timeMs)}</span>
        </li>
      ))}
    </ol>
  )
}
