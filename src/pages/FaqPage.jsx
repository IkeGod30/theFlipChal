import { FREE_ATTEMPTS, QUESTION_SECONDS } from '../config'

const FAQS = [
  {
    q: 'Do I need an account to take the quiz?',
    a: 'Yes. Log in or create a free account before starting a quiz, so your score can be tracked and shown on the leaderboard.',
  },
  {
    q: 'How many times can I attempt a quiz?',
    a: `Each account gets ${FREE_ATTEMPTS} attempt per prize. There's no way to get an extra attempt, so take your time and make it count.`,
  },
  {
    q: 'How much time do I get per question?',
    a: `You get ${QUESTION_SECONDS} seconds per question. If time runs out, that question counts as unanswered.`,
  },
  {
    q: 'How does the leaderboard decide the winner?',
    a: 'The highest score wins. If two players tie on score, the one with the faster total time ranks higher.',
  },
  {
    q: 'I forgot my password. What do I do?',
    a: 'On the login page, select "Forgot password?" and enter your account email. We’ll send a link to reset it.',
  },
]

export default function FaqPage() {
  return (
    <section className="info">
      <h2>Frequently Asked Questions</h2>
      <dl className="faq-list">
        {FAQS.map(({ q, a }) => (
          <div className="faq-item" key={q}>
            <dt>{q}</dt>
            <dd>{a}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
