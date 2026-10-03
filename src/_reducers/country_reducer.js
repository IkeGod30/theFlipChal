import { SET_COUNTRY } from '../_actions/types'
import { DEFAULT_COUNTRY } from '../data/countries'

// `source` records whether `code` came from IP geolocation or the visitor's own choice, so the
// one-time geolocation bootstrap in store.js knows never to overwrite a manual pick.
const initialState = { code: DEFAULT_COUNTRY, source: null }

export default function countryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COUNTRY:
      return { code: action.payload.code, source: action.payload.source }
    default:
      return state
  }
}
