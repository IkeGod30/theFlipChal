import { DEFAULT_COUNTRY } from './countries'
import { countryBookOverrides } from './countryBookOverrides'
import { ngPrizes } from './ngPrizes'
import { ghPrizes } from './ghPrizes'

// Countries with their own complete prize list, instead of the base US-style gift cards.
const countryPrizeLists = { NG: ngPrizes, GH: ghPrizes }

// Each prize is tied to a featured book; its quiz draws on that book's questions. The book can
// be swapped per country (see countryBookOverrides.js) so a prize can quiz on a locally popular
// title; valueUsd is the one canonical value, converted to local currency for display.
export const prizes = [
  {
    id: 'amazon-card',
    name: 'Amazon Gift Card',
    tagline: 'Spend it on your next read, or anything else',
    emoji: '📦',
    valueUsd: 150,
    bookId: 'pride',
    colors: ['#f6d365', '#fda085'],
  },
  {
    id: 'target-card',
    name: 'Target Gift Card',
    tagline: 'One stop for books, snacks and everything between',
    emoji: '🎯',
    valueUsd: 75,
    bookId: 'gatsby',
    colors: ['#a1c4fd', '#c2e9fb'],
  },
  {
    id: 'barnes-noble-card',
    name: 'Barnes & Noble Gift Card',
    tagline: 'Fill a whole shelf of your own',
    emoji: '📚',
    valueUsd: 200,
    bookId: 'mockingbird',
    colors: ['#d4a373', '#faedcd'],
  },
  {
    id: 'nike-card',
    name: 'Nike Gift Card',
    tagline: 'Step out in something new',
    emoji: '👟',
    valueUsd: 180,
    bookId: 'nineteen',
    colors: ['#c3cfe2', '#a6c1ee'],
  },
  {
    id: 'visa-card',
    name: 'Visa Gift Card',
    tagline: 'Works anywhere, on anything',
    emoji: '💳',
    valueUsd: 125,
    bookId: 'hobbit',
    colors: ['#84fab0', '#8fd3f4'],
  },
  {
    id: 'walmart-card',
    name: 'Walmart Gift Card',
    tagline: 'Everyday essentials, covered',
    emoji: '🛒',
    valueUsd: 50,
    bookId: 'potter',
    colors: ['#fbc2eb', '#a6c1ee'],
  },
  {
    id: 'whole-foods-card',
    name: 'Whole Foods Gift Card',
    tagline: 'Stock up for your next reading marathon',
    emoji: '🥑',
    valueUsd: 90,
    bookId: 'janeeyre',
    colors: ['#cfd9df', '#a3bded'],
  },
  {
    id: 'starbucks-card',
    name: 'Starbucks Gift Card',
    tagline: 'Fuel for one more chapter',
    emoji: '☕',
    valueUsd: 60,
    bookId: 'alice',
    colors: ['#ffecd2', '#fcb69f'],
  },
  {
    id: 'apple-card',
    name: 'Apple Gift Card',
    tagline: 'Apps, music, movies or your next audiobook',
    emoji: '🍎',
    valueUsd: 160,
    bookId: 'frankenstein',
    colors: ['#d4fc79', '#96e6a1'],
  },
]

// Resolves a prize's bookId for the given country, applying that country's override if one exists.
function withCountryBook(prize, countryCode) {
  const overrideBookId = countryBookOverrides[countryCode]?.[prize.bookId]
  return overrideBookId ? { ...prize, bookId: overrideBookId } : prize
}

export const getPrizesForCountry = (countryCode = DEFAULT_COUNTRY) =>
  countryPrizeLists[countryCode] || prizes.map((p) => withCountryBook(p, countryCode))

export const getPrize = (id, countryCode = DEFAULT_COUNTRY) =>
  getPrizesForCountry(countryCode).find((p) => p.id === id)
