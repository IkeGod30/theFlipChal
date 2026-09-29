import { EXTRA_ATTEMPT_USD } from '../config'
import { mockProvider } from './mockProvider'

// To take real payments, implement the provider contract (see mockProvider.js) for a real
// processor and switch this line. A production integration must verify the payment on a
// server (e.g. a webhook) before granting the attempt; a front-end-only app cannot.
export const provider = mockProvider

export const isTestMode = provider === mockProvider

export function chargeForExtraAttempt(prize) {
  return provider.charge({
    amountCents: EXTRA_ATTEMPT_USD * 100,
    description: `Extra attempt: ${prize.name}`,
  })
}
