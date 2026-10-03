import { useDispatch, useSelector } from 'react-redux'
import { setCountry } from '../_actions/country_actions'
import { selectCountryCode } from '../_reducers'
import { countryList } from '../data/countries'

// A country picker that both the nav bar (sitewide override, any time) and the signup page
// (required at account creation) use. Changing it always counts as a manual choice — see
// store.js, which otherwise auto-detects the country from IP once per browser.
export default function CountrySelect({ id = 'country', label = 'Country', hideLabel = false, className }) {
  const dispatch = useDispatch()
  const code = useSelector(selectCountryCode)

  return (
    <div className={className}>
      <label htmlFor={id} className={hideLabel ? 'visually-hidden' : undefined}>
        {label}
      </label>
      <select id={id} value={code} onChange={(e) => dispatch(setCountry(e.target.value, 'manual'))}>
        {countryList.map((c) => (
          <option key={c.code} value={c.code}>
            {c.flag} {c.name}
          </option>
        ))}
      </select>
    </div>
  )
}
