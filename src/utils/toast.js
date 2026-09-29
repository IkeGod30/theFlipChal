// A minimal, dependency-free toast bus. Any module can call toast.success(...)/toast.error(...);
// <Toaster /> (mounted once in App.jsx) subscribes and renders whatever comes through.
let nextId = 1
const listeners = new Set()

export function subscribeToast(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

function show(type, message, { duration = type === 'error' ? 6000 : 4000 } = {}) {
  const toastItem = { id: nextId++, type, message, duration }
  listeners.forEach((fn) => fn(toastItem))
}

export const toast = {
  success: (message, opts) => show('success', message, opts),
  error: (message, opts) => show('error', message, opts),
}
