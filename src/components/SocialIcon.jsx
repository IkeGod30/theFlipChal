// Simple outline glyphs drawn with currentColor, so they follow the theme.
const GLYPHS = {
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

export default function SocialIcon({ platform }) {
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
      {GLYPHS[platform]}
    </svg>
  )
}
