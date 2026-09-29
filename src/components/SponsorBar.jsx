import { useState } from 'react'
import { sponsors } from '../data/sponsors'

// The list is rendered several times so the track can loop seamlessly by
// translating exactly half its width. Only the first copy is exposed to assistive tech.
const COPIES = 6

function SponsorMark({ sponsor }) {
  const [failed, setFailed] = useState(false)
  if (!sponsor.logo || failed) return null // logos only: a sponsor without a logo file is left out
  return (
    <img
      className="sponsor-logo"
      src={`${import.meta.env.BASE_URL}sponsors/${sponsor.logo}`}
      alt={sponsor.name}
      onError={() => setFailed(true)}
    />
  )
}

export default function SponsorBar() {
  return (
    <aside className="sponsors" aria-label="Sponsors">
      <span className="sponsors-label">Sponsored by</span>
      <div className="ticker">
        <div className="ticker-track">
          {Array.from({ length: COPIES }, (_, copy) => (
            <ul className="ticker-group" key={copy} aria-hidden={copy > 0 || undefined}>
              {sponsors.map((s) => (
                <li key={s.id}>
                  <SponsorMark sponsor={s} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </aside>
  )
}
