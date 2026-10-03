import { mockProvider } from './mockProvider'

// To take real payments, implement the provider contract (see mockProvider.js) for a real
// processor and switch this line. A production integration must verify the payment on a
// server (e.g. a webhook) before treating anything as paid; a front-end-only app cannot.
export const provider = mockProvider
export const isTestMode = provider === mockProvider

export function chargeAmount(amountCents, description) {
  return provider.charge({ amountCents, description })
}
