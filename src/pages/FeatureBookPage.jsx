import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FEATURE_BASE_FEE_USD, FEATURE_INCLUDED_PAGES, FEATURE_PER_EXTRA_PAGE_USD } from '../config'
import { selectCountryCode, selectUser } from '../_reducers'
import { formatUsdAmount } from '../utils/currency'
import { contact } from '../data/contact'
import FeatureFeeDialog from '../components/FeatureFeeDialog'
import { toast } from '../utils/toast'

const ROLES = ['Author', 'Publisher', 'Literary agent', 'Copyright owner / estate', 'Other authorized representative']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function feeUsdForPages(pages) {
  const extraPages = Math.max(0, pages - FEATURE_INCLUDED_PAGES)
  return FEATURE_BASE_FEE_USD + extraPages * FEATURE_PER_EXTRA_PAGE_USD
}

function buildMailto(form, feeUsd, countryCode, receiptId) {
  const subject = `Book feature request: ${form.title}`
  const body = [
    `Requester: ${form.name} (${form.role})`,
    `Requester email: ${form.email}`,
    '',
    `Book title: ${form.title}`,
    `Book author(s): ${form.author}`,
    `Page count: ${form.pages}`,
    form.genre && `Genre: ${form.genre}`,
    '',
    form.synopsis && `Synopsis / why it fits:\n${form.synopsis}`,
    '',
    `Processing fee paid: ${formatUsdAmount(feeUsd, countryCode)} (receipt ${receiptId})`,
  ]
    .filter((line) => line !== '' && line !== false && line !== undefined)
    .join('\n')

  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const emptyForm = { name: '', email: '', role: ROLES[0], title: '', author: '', pages: '', genre: '', synopsis: '' }

export default function FeatureBookPage() {
  const user = useSelector(selectUser)
  const countryCode = useSelector(selectCountryCode)
  const [form, setForm] = useState({
    ...emptyForm,
    name: user?.displayName || '',
    email: user?.email || '',
  })
  const [agreed, setAgreed] = useState(false)
  const [paying, setPaying] = useState(false)
  const [submitted, setSubmitted] = useState(null) // { mailtoUrl, feeUsd } once paid

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const pages = Number.parseInt(form.pages, 10)
  const pagesValid = Number.isInteger(pages) && pages > 0
  const feeUsd = pagesValid ? feeUsdForPages(pages) : null

  const valid =
    form.name.trim().length > 0 &&
    EMAIL_RE.test(form.email.trim()) &&
    form.title.trim().length > 0 &&
    form.author.trim().length > 0 &&
    pagesValid &&
    agreed

  const onPaid = (receipt) => {
    setPaying(false)
    const mailtoUrl = buildMailto(form, feeUsd, countryCode, receipt.id)
    setSubmitted({ mailtoUrl, feeUsd })
    toast.success('Payment received. Send the prepared email to complete your submission.')
    window.location.href = mailtoUrl // best-effort: opens the visitor's own mail client
  }

  const startOver = () => {
    setForm({ ...emptyForm, name: user?.displayName || '', email: user?.email || '' })
    setAgreed(false)
    setSubmitted(null)
  }

  if (submitted) {
    return (
      <section className="info feature">
        <h2>Almost done</h2>
        <p>
          Your {formatUsdAmount(submitted.feeUsd, countryCode)} processing fee went through. Since
          this site doesn’t have a submissions inbox of its own, we’ve prepared an email with your
          book’s details — please send it to finish your request.
        </p>
        <a className="btn primary" href={submitted.mailtoUrl}>Open the prepared email</a>
        <p className="note">
          If your email app didn’t open automatically, use the button above, or email us directly
          at <a href={`mailto:${contact.email}`}>{contact.email}</a> with your book’s details.
        </p>
        <button type="button" className="link" onClick={startOver}>Submit another book</button>
      </section>
    )
  }

  return (
    <section className="info feature">
      <h2>Feature a book</h2>
      <p className="sub">
        Authors, publishers, agents and copyright owners can submit a book to be considered as a
        featured title, with its own prize and quiz. There’s a one-time processing fee, based on
        the book’s length.
      </p>

      <form
        className="feature-form"
        onSubmit={(e) => {
          e.preventDefault()
          if (valid) setPaying(true)
        }}
      >
        <h3>Your details</h3>
        <label htmlFor="req-name">Your name</label>
        <input id="req-name" value={form.name} onChange={set('name')} placeholder="e.g. Ada Lovelace" />

        <label htmlFor="req-email">Your email</label>
        <input id="req-email" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" />

        <label htmlFor="req-role">Your role</label>
        <select id="req-role" value={form.role} onChange={set('role')}>
          {ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <h3>Book details</h3>
        <label htmlFor="book-title">Book title</label>
        <input id="book-title" value={form.title} onChange={set('title')} placeholder="e.g. The Midnight Library" />

        <label htmlFor="book-author">Book author(s)</label>
        <input id="book-author" value={form.author} onChange={set('author')} placeholder="e.g. Matt Haig" />

        <label htmlFor="book-pages">Page count</label>
        <input id="book-pages" type="number" min="1" step="1" value={form.pages} onChange={set('pages')} placeholder="e.g. 320" />

        <label htmlFor="book-genre">Genre (optional)</label>
        <input id="book-genre" value={form.genre} onChange={set('genre')} placeholder="e.g. Literary fiction" />

        <label htmlFor="book-synopsis">Synopsis, or why it’d make a good quiz (optional)</label>
        <textarea id="book-synopsis" rows={4} value={form.synopsis} onChange={set('synopsis')} />

        <div className="fee-summary">
          <span>Processing fee</span>
          <strong>
            {feeUsd != null ? formatUsdAmount(feeUsd, countryCode) : '—'}
          </strong>
        </div>
        <p className="note">
          {formatUsdAmount(FEATURE_BASE_FEE_USD, countryCode)} covers up to {FEATURE_INCLUDED_PAGES} pages;
          {' '}{formatUsdAmount(FEATURE_PER_EXTRA_PAGE_USD, countryCode)} for each page after that.
        </p>

        <label className="check">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          I’m the author, publisher, copyright holder, or an authorized representative of this
          book, and have the right to submit it for consideration.
        </label>

        <button className="btn primary" disabled={!valid}>
          Continue to payment{feeUsd != null ? ` (${formatUsdAmount(feeUsd, countryCode)})` : ''}
        </button>
      </form>

      {paying && (
        <FeatureFeeDialog
          amountUsd={feeUsd}
          countryCode={countryCode}
          bookTitle={form.title}
          onPaid={onPaid}
          onCancel={() => setPaying(false)}
        />
      )}
    </section>
  )
}
