import { FREE_ATTEMPTS, QUESTION_SECONDS } from '../config'

export default function HowToWinPage() {
  return (
    <section className="info">
      <h2>How to Win</h2>
      <ol>
        <li>Select your country and create a free account.</li>
        <li>Pick a prize from the gallery. Each one is tied to a featured book, chosen for your country.</li>
        <li>Answer 10 questions about that book.</li>
        <li>You get {QUESTION_SECONDS} seconds per question, so read closely and answer quickly.</li>
        <li>The highest score wins the prize. Ties go to the faster total time.</li>
      </ol>
      <p>Each account gets {FREE_ATTEMPTS} attempt per prize, so make it count.</p>
      <p className="note">Your result on that one attempt is what counts.</p>
    </section>
  )
}
