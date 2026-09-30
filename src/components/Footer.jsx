import { Link } from 'react-router-dom'
import { contact } from '../data/contact'

// Simple outline glyphs drawn with currentColor, so they follow the theme.
// Merged in from the old SocialIcon.jsx, which nothing else used.
const SOCIAL_GLYPHS = {
  Email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  X: <path d="M4 4l16 16M20 4L4 20" />,
  TikTok: <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.3 2.5 2 4.3 5 4.5" />,
  Facebook: <path d="M17 3h-2.5A4.5 4.5 0 0 0 10 7.5V10H7v4h3v7h4v-7h3l1-4h-4V7.5a.5.5 0 0 1 .5-.5H17z" />,
}

function SocialIcon({ platform }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {SOCIAL_GLYPHS[platform]}
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <p className="copyright">© {new Date().getFullYear()} The Flip Challenge. All rights reserved.</p>

        <ul className="socials">
          <li>
            <a href={`mailto:${contact.email}`} aria-label={`Email us at ${contact.email}`} title={contact.email}>
              <SocialIcon platform="Email" />
            </a>
          </li>
          {contact.socials.map((s) => (
            <li key={s.platform}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.platform} (opens in a new tab)`}
                title={s.platform}
              >
                <SocialIcon platform={s.platform} />
              </a>
            </li>
          ))}
        </ul>

        <nav className="footer-links" aria-label="Footer">
          <Link to="/faq">Faq</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-use">Terms of Use</Link>
        </nav>
      </div>
    </footer>
  )
}
