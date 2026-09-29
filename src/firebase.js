import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Missing config is a setup problem, not a runtime one: fail loudly and early rather than
// leaving every login attempt to fail with an opaque Firebase network error.
if (!config.apiKey || !config.projectId) {
  throw new Error(
    'Firebase is not configured. Copy .env.example to .env.local, fill in your Firebase ' +
      'project keys, and restart the dev server.',
  )
}

export const app = initializeApp(config)
export const auth = getAuth(app)
