// Test-mode payment provider: no money moves and nothing is verified.
// Contract every provider follows: charge({ amountCents, description }) resolves to
// { id, amountCents } once payment has succeeded, and rejects with an Error otherwise.
export const mockProvider = {
  name: 'mock',
  charge({ amountCents }) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ id: `mock_${Date.now().toString(36)}`, amountCents }), 900)
    })
  },
}
