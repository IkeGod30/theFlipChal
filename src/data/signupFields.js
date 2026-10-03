// Extra fields collected at signup, on top of name/email/password, based on the country the
// visitor selects. Each field's value is stored in the `profile` slice, keyed by uid, alongside
// the account's country — see _reducers/profile_reducer.js.
export const signupFields = {
  US: [{ id: 'zip', label: 'ZIP code', autoComplete: 'postal-code', placeholder: 'e.g. 73301' }],
  GB: [{ id: 'postcode', label: 'Postcode', autoComplete: 'postal-code', placeholder: 'e.g. SW1A 1AA' }],
  CA: [
    { id: 'province', label: 'Province', autoComplete: 'address-level1', placeholder: 'e.g. Ontario' },
    { id: 'postalCode', label: 'Postal code', autoComplete: 'postal-code', placeholder: 'e.g. K1A 0B1' },
  ],
  NG: [
    { id: 'state', label: 'State', autoComplete: 'address-level1', placeholder: 'e.g. Lagos' },
    { id: 'phone', label: 'Phone number', autoComplete: 'tel', placeholder: 'e.g. 080 1234 5678' },
  ],
  GH: [
    { id: 'region', label: 'Region', autoComplete: 'address-level1', placeholder: 'e.g. Greater Accra' },
    { id: 'phone', label: 'Phone number', autoComplete: 'tel', placeholder: 'e.g. 024 123 4567' },
  ],
}

export const signupFieldsFor = (countryCode) => signupFields[countryCode] || []
