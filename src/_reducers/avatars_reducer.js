import { SET_AVATAR } from '../_actions/types'

// State shape: { [uid]: dataUrl }. There's no photo storage backend, so uploaded avatars are
// stored as small data URLs here, in this browser only — they don't follow the account
// anywhere else, unlike everything Firebase actually manages.
export default function avatarsReducer(state = {}, action) {
  switch (action.type) {
    case SET_AVATAR: {
      const { uid, dataUrl } = action.payload
      if (dataUrl) return { ...state, [uid]: dataUrl }
      if (!(uid in state)) return state
      const { [uid]: _removed, ...rest } = state
      return rest
    }
    default:
      return state
  }
}
