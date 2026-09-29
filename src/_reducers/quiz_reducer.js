import { ANSWER_QUESTION, FINISH_QUIZ, NEXT_QUESTION, QUIT_QUIZ, START_QUIZ } from '../_actions/types'

// session: { prizeId, playerName, playerKey, questions, index, answers: [{ choice, correct, timeMs }], status: 'active' | 'finished' }
// lastResult: { prizeId, name, score, timeMs, at } of the most recently finished quiz
const initialState = { session: null, lastResult: null }

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case START_QUIZ:
      return {
        session: { ...action.payload, index: 0, answers: [], status: 'active' },
        lastResult: null,
      }

    case ANSWER_QUESTION: {
      const { session } = state
      if (!session || session.status !== 'active' || session.answers.length > session.index) return state
      const { choice, timeMs } = action.payload
      const correct = choice === session.questions[session.index].correct
      return { ...state, session: { ...session, answers: [...session.answers, { choice, correct, timeMs }] } }
    }

    case NEXT_QUESTION: {
      const { session } = state
      if (!session || session.index + 1 >= session.questions.length) return state
      return { ...state, session: { ...session, index: session.index + 1 } }
    }

    case FINISH_QUIZ:
      if (!state.session) return state
      return { session: { ...state.session, status: 'finished' }, lastResult: action.payload }

    case QUIT_QUIZ:
      return { ...state, session: null }

    default:
      return state
  }
}
