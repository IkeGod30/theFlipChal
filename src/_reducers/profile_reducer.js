import { SET_PROFILE } from '../_actions/types'

// State shape: { [uid]: { countryCode, ...extra signup fields } }. There's no database set up
// for this app (see avatars_reducer.js for the same tradeoff), so this lives in this browser's
// localStorage only, keyed by account uid.
export default function profileReducer(state = {}, action) {
  switch (action.type) {
    case SET_PROFILE: {
      const { uid, details } = action.payload
      return { ...state, [uid]: details }
    }
    default:
      return state
  }
}
