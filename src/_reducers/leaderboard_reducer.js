import { FINISH_QUIZ } from '../_actions/types'
import { compareEntries } from '../utils/quiz'

// State shape: { [countryCode]: { [prizeId]: [{ name, score, timeMs, at }] } }, sorted best-first,
// one entry per player. Scoped by country as well as prize: a country can swap in a different
// book for the same prize (see data/countryBookOverrides.js), so two countries' scores for the
// "same" prize can be answers to entirely different quizzes and must never be mixed together.
export default function leaderboardReducer(state = {}, action) {
  switch (action.type) {
    case FINISH_QUIZ: {
      const { countryCode, prizeId, ...entry } = action.payload
      const forCountry = state[countryCode] || {}
      const entries = forCountry[prizeId] || []
      const key = entry.name.trim().toLowerCase()
      const existing = entries.find((e) => e.name.trim().toLowerCase() === key)
      if (existing && compareEntries(existing, entry) <= 0) return state // keep their better run
      const next = entries.filter((e) => e !== existing).concat(entry).sort(compareEntries)
      return { ...state, [countryCode]: { ...forCountry, [prizeId]: next } }
    }
    default:
      return state
  }
}
