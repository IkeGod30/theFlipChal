import { FINISH_QUIZ } from '../_actions/types'
import { compareEntries } from '../utils/quiz'

// State shape: { [prizeId]: [{ name, score, timeMs, at }] }, sorted best-first, one entry per player.
export default function leaderboardReducer(state = {}, action) {
  switch (action.type) {
    case FINISH_QUIZ: {
      const { prizeId, ...entry } = action.payload
      const entries = state[prizeId] || []
      const key = entry.name.trim().toLowerCase()
      const existing = entries.find((e) => e.name.trim().toLowerCase() === key)
      if (existing && compareEntries(existing, entry) <= 0) return state // keep their better run
      const next = entries.filter((e) => e !== existing).concat(entry).sort(compareEntries)
      return { ...state, [prizeId]: next }
    }
    default:
      return state
  }
}
