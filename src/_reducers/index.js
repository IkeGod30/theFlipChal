import { combineReducers } from 'redux'
import quiz from './quiz_reducer'
import leaderboard from './leaderboard_reducer'
import attempts from './attempts_reducer'
import auth from './auth_reducer'
import avatars from './avatars_reducer'
import country from './country_reducer'
import profile from './profile_reducer'
import { FREE_ATTEMPTS } from '../config'
import { countries, DEFAULT_COUNTRY } from '../data/countries'

const rootReducer = combineReducers({ quiz, leaderboard, attempts, auth, avatars, country, profile })

export default rootReducer

const EMPTY = []
export const selectEntries = (state, countryCode, prizeId) => state.leaderboard[countryCode]?.[prizeId] || EMPTY

// Returns the stored record (a stable reference), so useSelector doesn't re-render needlessly.
const NO_ATTEMPTS = { used: 0 }
export const selectAttemptRecord = (state, countryCode, prizeId, key) =>
  state.attempts[countryCode]?.[prizeId]?.[key] || NO_ATTEMPTS
export const attemptsRemaining = ({ used }) => FREE_ATTEMPTS - used

export const selectAuthStatus = (state) => state.auth.status
export const selectUser = (state) => state.auth.user
export const selectAvatar = (state, uid) => state.avatars[uid] || null

export const selectCountryCode = (state) => state.country.code
export const selectCountryInfo = (state) => countries[state.country.code] || countries[DEFAULT_COUNTRY]
export const selectProfile = (state, uid) => state.profile[uid] || null
