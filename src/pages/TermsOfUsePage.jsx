import { EXTRA_ATTEMPT_USD, FREE_ATTEMPTS } from '../config'
import { contact } from '../data/contact'

export default function TermsOfUsePage() {
  return (
    <section className="info">
      <h2>Terms of Use</h2>
      <p className="note">
        This is a plain-language draft, not a finished legal document. In particular, a prize
        contest that lets people pay for extra attempts can trigger sweepstakes or lottery
        regulations in many places, which usually require a free method of entry and published
        official rules. Have this page reviewed by a lawyer before running a real prize contest.
      </p>

      <h3>The quiz</h3>
      <p>
        You need an account to take a quiz. Each account gets {FREE_ATTEMPTS} free attempt per
        prize; additional attempts are offered for a ${EXTRA_ATTEMPT_USD} donation. Scores and
        display names may be shown publicly on that prize’s leaderboard.
      </p>

      <h3>Prizes</h3>
      <p>
        Prizes, values and winner selection shown in the app are examples and haven’t been backed
        by official contest rules, eligibility terms or a fulfillment process yet.
      </p>

      <h3>Accounts</h3>
      <p>You’re responsible for keeping your password secure and for the accuracy of the name you enter.</p>

      <h3>Questions</h3>
      <p>
        Contact us at <a href={`mailto:${contact.email}`}>{contact.email}</a> with any questions
        about these terms.
      </p>
    </section>
  )
}
