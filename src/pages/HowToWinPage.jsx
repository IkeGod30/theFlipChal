import { EXTRA_ATTEMPT_USD, FREE_ATTEMPTS, QUESTION_SECONDS } from '../config'

export default function HowToWinPage() {
  return (
    <section className="info">
      <h2>How to Win</h2>
      <ol>
        <li>Log in or create a free account.</li>
        <li>Pick a prize from the gallery. Each one is tied to a featured book.</li>
        <li>Answer 10 questions about that book.</li>
        <li>You get {QUESTION_SECONDS} seconds per question, so read closely and answer quickly.</li>
        <li>The highest score wins the prize. Ties go to the faster total time.</li>
      </ol>
      <p>
        Each account gets {FREE_ATTEMPTS} free attempt per prize. If you’d like another try, donate
        ${EXTRA_ATTEMPT_USD} for each extra attempt.
      </p>
      <p className="note">Your best result is the one that counts.</p>
    </section>
  )
}
