import { books } from '../data/books'

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
  }
  return a
}

// Random question order with shuffled options.
export function buildQuestions(bookId) {
  return shuffle(books[bookId].questions).map((q) => ({
    text: q.q,
    options: shuffle([q.correct, ...q.wrong]),
    correct: q.correct,
  }))
}

// Highest score wins; faster total time breaks ties.
export function compareEntries(a, b) {
  return b.score - a.score || a.timeMs - b.timeMs
}

export function formatTime(ms) {
  return `${(ms / 1000).toFixed(1)}s`
}
