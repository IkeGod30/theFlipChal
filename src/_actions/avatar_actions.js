import { SET_AVATAR } from './types'

export const setAvatar = (uid, dataUrl) => ({ type: SET_AVATAR, payload: { uid, dataUrl } })
export const clearAvatar = (uid) => setAvatar(uid, null)
