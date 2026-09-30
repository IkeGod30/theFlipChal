import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase'

// These call Firebase directly rather than dispatching Redux actions themselves: the store
// (see store.js) listens to Firebase's own auth-state stream and dispatches AUTH_STATE_CHANGED
// from there, so the store and Firebase's notion of "who's signed in" can never disagree.

export async function signUp(name, email, password) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(user, { displayName: name })
  // updateProfile doesn't push into the auth-state stream, so the store won't see the name
  // until the next refresh unless we tell it now.
  auth.currentUser.reload && (await auth.currentUser.reload())
}

export function logIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function logOut() {
  return signOut(auth)
}

export function resetPassword(email) {
  return sendPasswordResetEmail(auth, email)
}

function reauthenticate(password) {
  const user = auth.currentUser
  return reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, password))
}

// Firebase requires a recent sign-in for both of these; re-entering the current password
// satisfies that and doubles as the user confirming it's really them.
export async function changePassword(currentPassword, newPassword) {
  await reauthenticate(currentPassword)
  await updatePassword(auth.currentUser, newPassword)
}

export async function deleteAccount(currentPassword) {
  await reauthenticate(currentPassword)
  await deleteUser(auth.currentUser)
}

// Friendlier text for the handful of errors a signup/login form actually hits.
export function authErrorMessage(err) {
  switch (err.code) {
    case 'auth/email-already-in-use':
      return 'An account already exists for that email. Try logging in instead.'
    case 'auth/invalid-email':
      return 'That email address doesn’t look right.'
    case 'auth/weak-password':
      return 'Please use at least 6 characters.'
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Email or password is incorrect.'
    case 'auth/user-not-found':
      return 'No account found for that email.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.'
    case 'auth/requires-recent-login':
      return 'Please log out and back in, then try again.'
    default:
      return err.message || 'Something went wrong. Please try again.'
  }
}
