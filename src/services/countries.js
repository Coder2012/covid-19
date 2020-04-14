import { domain } from './domain'

const setCountries = domain.event('setCountries')

export const fetchCountries = async () => {
  const countries = await (await fetch(`https://api.covid19api.com/countries`)).json()
  setCountries(countries)
}

export const countryList = domain.store([], {name: 'countries'}).on(setCountries, (state, countries) =>
  countries.sort((a, b) => a.Country.localeCompare(b.Country)).map(({ Slug, Country }) => ({ value: Slug, label: Country }))
)
