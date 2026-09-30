import { contact } from '../data/contact'

export default function PrivacyPolicyPage() {
  return (
    <section className="info">
      <h2>Privacy Policy</h2>
      <p className="note">
        This is a plain-language draft describing what the app actually stores today. It hasn’t
        been reviewed by a lawyer and shouldn’t be treated as a finished policy — have it reviewed
        before relying on it.
      </p>

      <h3>What we collect</h3>
      <ul>
        <li>
          <strong>Account details.</strong> When you sign up, your name, email and password are
          sent to Firebase Authentication (a Google service) to create your account. We don’t see
          or store your password ourselves.
        </li>
        <li>
          <strong>Quiz results.</strong> Your name, score and completion time are stored so the
          leaderboard for each prize can be shown to other visitors.
        </li>
        <li>
          <strong>Uploaded avatar picture.</strong> If you upload one, it’s resized and saved only
          in your own browser. It isn’t sent to a server and doesn’t follow you to another device.
        </li>
      </ul>

      <h3>What we don’t collect</h3>
      <p>We don’t use analytics or advertising trackers, and we don’t sell any information to third parties.</p>

      <h3>Questions</h3>
      <p>
        Contact us at <a href={`mailto:${contact.email}`}>{contact.email}</a> with any privacy
        questions.
      </p>
    </section>
  )
}
