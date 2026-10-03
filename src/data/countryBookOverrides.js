// For these countries, the prize that's normally tied to `from` quizzes on `to` instead — a
// locally popular title in place of the global default. Only applies to countries that reuse
// the base `prizes` list (see prizes.js); Nigeria and Ghana have their own prize lists entirely
// (ngPrizes.js, ghPrizes.js) with the right bookId already built in.
export const countryBookOverrides = {
  GB: { gatsby: 'greatExpectations' },
  CA: { nineteen: 'handmaidsTale' },
}
