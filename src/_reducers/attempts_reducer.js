import { START_QUIZ } from '../_actions/types'

// State shape: { [countryCode]: { [prizeId]: { [uid]: { used } } } }, scoped by country for the
// same reason as leaderboard_reducer.js — the same prize can mean a different quiz in a
// different country.
// `used` counts quizzes started (so quitting or refreshing mid-quiz still spends the attempt).
// Attempts remaining = FREE_ATTEMPTS - used (see _reducers/index.js) — there's no way to earn more.
export default function attemptsReducer(state = {}, action) {
  switch (action.type) {
    case START_QUIZ: {
      const { countryCode, prizeId, playerKey } = action.payload
      const forCountry = state[countryCode] || {}
      const forPrize = forCountry[prizeId] || {}
      const used = (forPrize[playerKey]?.used || 0) + 1
      return {
        ...state,
        [countryCode]: { ...forCountry, [prizeId]: { ...forPrize, [playerKey]: { used } } },
      }
    }
    default:
      return state
  }
}
