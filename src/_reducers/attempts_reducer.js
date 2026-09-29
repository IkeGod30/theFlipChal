import { ADD_ATTEMPT_CREDIT, START_QUIZ } from '../_actions/types'

// State shape: { [prizeId]: { [phoneKey]: { used, credits } } }
// `used` counts quizzes started (so quitting or refreshing mid-quiz still spends the attempt);
// `credits` counts paid extra attempts. Attempts remaining = FREE_ATTEMPTS + credits - used.
function bump(state, prizeId, key, field) {
  const forPrize = state[prizeId] || {}
  const record = forPrize[key] || { used: 0, credits: 0 }
  return { ...state, [prizeId]: { ...forPrize, [key]: { ...record, [field]: record[field] + 1 } } }
}

export default function attemptsReducer(state = {}, action) {
  switch (action.type) {
    case START_QUIZ:
      return bump(state, action.payload.prizeId, action.payload.playerKey, 'used')
    case ADD_ATTEMPT_CREDIT:
      return bump(state, action.payload.prizeId, action.payload.playerKey, 'credits')
    default:
      return state
  }
}
