import { DEFAULT_COUNTRY, isSupportedCountry } from '../data/countries'

const TIMEOUT_MS = 4000

// Best-effort IP -> country lookup via a free, keyless geolocation API. This sends the
// visitor's IP address to ipapi.co. It's only ever called once per browser (see store.js),
// and it fails safe to DEFAULT_COUNTRY on any error, timeout, unsupported country, blocked
// request (ad blockers commonly block this kind of call) or if the free tier is rate-limited.
export async function geolocateCountry() {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal })
    if (!res.ok) return DEFAULT_COUNTRY
    const data = await res.json()
    return isSupportedCountry(data.country_code) ? data.country_code : DEFAULT_COUNTRY
  } catch {
    return DEFAULT_COUNTRY
  } finally {
    clearTimeout(timer)
  }
}
