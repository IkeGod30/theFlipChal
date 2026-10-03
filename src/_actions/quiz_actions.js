import { ANSWER_QUESTION, FINISH_QUIZ, NEXT_QUESTION, QUIT_QUIZ, START_QUIZ } from './types'
import { buildQuestions } from '../utils/quiz'

// Questions are shuffled here so the reducers stay pure. countryCode is locked in for the whole
// session, so leaderboard/attempts always land under the country the quiz was actually taken in,
// even if the visitor switches their country setting mid-quiz.
export function startQuiz(prizeId, bookId, playerName, playerKey, countryCode) {
  return {
    type: START_QUIZ,
    payload: { prizeId, playerName, playerKey, countryCode, questions: buildQuestions(bookId) },
  }
}

// choice is the chosen option, or null when the timer ran out.
export function answerQuestion(choice, timeMs) {
  return { type: ANSWER_QUESTION, payload: { choice, timeMs } }
}

export function nextQuestion() {
  return { type: NEXT_QUESTION }
}

// Summarises a completed session; the quiz and leaderboard reducers both handle this.
export function finishQuiz(session) {
  return {
    type: FINISH_QUIZ,
    payload: {
      prizeId: session.prizeId,
      countryCode: session.countryCode,
      name: session.playerName,
      score: session.answers.filter((a) => a.correct).length,
      timeMs: session.answers.reduce((sum, a) => sum + a.timeMs, 0),
      at: Date.now(),
    },
  }
}

export function quitQuiz() {
  return { type: QUIT_QUIZ }
}
