import { countries, DEFAULT_COUNTRY } from '../data/countries'

function formatAmount(amount, country) {
  return `${country.symbol}${Math.round(amount).toLocaleString('en-US')}`
}

// For a flat USD amount shown in the visitor's local currency, converted using the static rates
// in countries.js. Non-USD amounts get a "≈" prefix, since a static rate is always an
// approximation, not a live one.
export function formatUsdAmount(amountUsd, countryCode) {
  const country = countries[countryCode] || countries[DEFAULT_COUNTRY]
  const formatted = formatAmount(amountUsd * country.usdRate, country)
  return country.currency === 'USD' ? formatted : `≈ ${formatted}`
}

// For a prize's displayed value. Most prizes (US/UK/Canada gift cards) store a single USD value
// and get converted like any other USD amount. Prizes in their own fixed local denomination
// (e.g. Nigerian/Ghanaian recharge cards — see data/ngPrizes.js, data/ghPrizes.js) carry
// `valueNative` instead, which is shown exactly as given, with no conversion or "≈".
export function formatPrizeValue(prize, countryCode) {
  if (prize.valueNative != null) {
    const country = countries[countryCode] || countries[DEFAULT_COUNTRY]
    return formatAmount(prize.valueNative, country)
  }
  return formatUsdAmount(prize.valueUsd, countryCode)
}
