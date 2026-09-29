import { contact } from '../data/contact'
import SocialIcon from './SocialIcon'

export default function Footer() {
  return (
    <footer className="footer">
      <section className="contact" id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">Contact us</h2>
        <p>
          Questions, book ideas or feedback? Email us at{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a> or find us on social media.
        </p>
        <ul className="socials">
          {contact.socials.map((s) => (
            <li key={s.platform}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.platform} (opens in a new tab)`} title={s.platform}>
                <SocialIcon platform={s.platform} />
              </a>
            </li>
          ))}
        </ul>
      </section>
      <p className="copyright">© {new Date().getFullYear()} The Flip Challenge. All rights reserved.</p>
    </footer>
  )
}
