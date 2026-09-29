import { ADD_ATTEMPT_CREDIT, ANSWER_QUESTION, FINISH_QUIZ, NEXT_QUESTION, QUIT_QUIZ, START_QUIZ } from './types'
import { buildQuestions } from '../utils/quiz'

// Questions are shuffled here so the reducers stay pure.
// playerKey is the normalized phone number; starting a quiz spends one of that player's attempts.
export function startQuiz(prizeId, bookId, playerName, playerKey) {
  return {
    type: START_QUIZ,
    payload: { prizeId, playerName, playerKey, questions: buildQuestions(bookId) },
  }
}

// Grants one paid extra attempt for this player on this prize.
export function addAttemptCredit(prizeId, playerKey) {
  return { type: ADD_ATTEMPT_CREDIT, payload: { prizeId, playerKey } }
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
