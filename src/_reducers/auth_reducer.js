import { AUTH_STATE_CHANGED } from '../_actions/types'

// status: 'loading' until Firebase reports the initial state, then 'signed-in' or 'signed-out'.
// user: { uid, email, displayName } | null
const initialState = { status: 'loading', user: null }

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_STATE_CHANGED:
      return { status: action.payload ? 'signed-in' : 'signed-out', user: action.payload }
    default:
      return state
  }
}
