import { combineReducers } from 'redux'
import quiz from './quiz_reducer'
import leaderboard from './leaderboard_reducer'
import attempts from './attempts_reducer'
import auth from './auth_reducer'
import avatars from './avatars_reducer'
import { FREE_ATTEMPTS } from '../config'

const rootReducer = combineReducers({ quiz, leaderboard, attempts, auth, avatars })

export default rootReducer

const EMPTY = []
export const selectEntries = (state, prizeId) => state.leaderboard[prizeId] || EMPTY

// Returns the stored record (a stable reference), so useSelector doesn't re-render needlessly.
const NO_ATTEMPTS = { used: 0, credits: 0 }
export const selectAttemptRecord = (state, prizeId, key) => state.attempts[prizeId]?.[key] || NO_ATTEMPTS
export const attemptsRemaining = ({ used, credits }) => FREE_ATTEMPTS + credits - used

export const selectAuthStatus = (state) => state.auth.status
export const selectUser = (state) => state.auth.user
export const selectAvatar = (state, uid) => state.avatars[uid] || null
