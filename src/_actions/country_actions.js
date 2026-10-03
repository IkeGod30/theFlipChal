import { SET_COUNTRY } from './types'

// source: 'detected' (from IP geolocation) or 'manual' (the visitor picked it). Manual choices
// are never overwritten by a later detection — see store.js.
export const setCountry = (code, source = 'manual') => ({ type: SET_COUNTRY, payload: { code, source } })
