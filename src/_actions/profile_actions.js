import { SET_PROFILE } from './types'

// details: { countryCode, ...extra country-specific fields from data/signupFields.js }
export const setProfile = (uid, details) => ({ type: SET_PROFILE, payload: { uid, details } })
