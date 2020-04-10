import { createEffect, createStore } from 'effector'

export const fetchCountries = createEffect({
  async handler() {
    const res = await fetch(`https://api.covid19api.com/countries`)
    return res.json()
  },
})

export const countryList = createStore([])
  .on(fetchCountries.doneData,
    (state, countries) =>
      countries
        .sort((a, b) => a.Country.localeCompare(b.Country))
        .map(({ Slug, Country }) => ({ value: Slug, label: Country }))
  )
