// Initials avatar: accounts are email/password only, so there's no profile photo to show.
// The color is derived from a stable seed (the user's uid), so the same person always gets
// the same color across sessions and devices.
const PALETTE = ['#b5442e', '#2e7d4f', '#3a6ea5', '#8a5a2e', '#7a4fa3', '#0f766e']

function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0
  return h
}

function initialsFor(name) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return '?'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

export default function Avatar({ name, seed, size = 32 }) {
  const color = PALETTE[hash(seed || name) % PALETTE.length]
  return (
    <span
      className="avatar"
      style={{ width: size, height: size, fontSize: size * 0.4, background: color }}
      aria-hidden="true"
    >
      {initialsFor(name)}
    </span>
  )
}
