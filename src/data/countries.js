// usdRate: approximate units of local currency per 1 USD, for display only. These are rough,
// static placeholders (set 2026) — they will drift from real exchange rates over time and
// should be swapped for a live rates feed before any real money is on the line.
export const DEFAULT_COUNTRY = 'US'

export const countries = {
  US: { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$', usdRate: 1 },
  GB: { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', symbol: '£', usdRate: 0.79 },
  CA: { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', symbol: 'C$', usdRate: 1.37 },
  NG: { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currency: 'NGN', symbol: '₦', usdRate: 1550 },
  GH: { code: 'GH', name: 'Ghana', flag: '🇬🇭', currency: 'GHS', symbol: 'GH₵', usdRate: 15.3 },
}

export const countryList = Object.values(countries)

export const isSupportedCountry = (code) => Boolean(countries[code])
