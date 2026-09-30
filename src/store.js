import { legacy_createStore as createStore } from 'redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import rootReducer from './_reducers'
import { AUTH_STATE_CHANGED } from './_actions/types'

// Slices kept in localStorage so they survive a reload.
const PERSISTED = {
  leaderboard: 'flipchal:leaderboard:v2',
  attempts: 'flipchal:attempts:v1',
  avatars: 'flipchal:avatars:v1',
}

function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || {}
  } catch {
    return {}
  }
}

const preloaded = Object.fromEntries(Object.entries(PERSISTED).map(([slice, key]) => [slice, load(key)]))

const store = createStore(
  rootReducer,
  preloaded,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

// Persist each slice only when it changes.
const saved = { ...preloaded }
store.subscribe(() => {
  const state = store.getState()
  for (const [slice, key] of Object.entries(PERSISTED)) {
    if (state[slice] === saved[slice]) continue
    saved[slice] = state[slice]
    try {
      localStorage.setItem(key, JSON.stringify(state[slice]))
    } catch {
      /* storage unavailable: this slice lasts for this session only */
    }
  }
})

// The store's `auth` slice mirrors Firebase's own auth state, so nothing else in the app
// talks to Firebase directly to find out who's signed in.
onAuthStateChanged(auth, (user) => {
  store.dispatch({
    type: AUTH_STATE_CHANGED,
    payload: user && { uid: user.uid, email: user.email, displayName: user.displayName },
  })
})

export default store
