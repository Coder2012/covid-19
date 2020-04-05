import { createEffect } from 'effector'

export const fetchCountries = createEffect({
  async handler() {
    const res = await fetch(`https://api.covid19api.com/countries`)
    console.log('countries')
    return res.json()
  },
})

export const fetchCases = createEffect({
  async handler(country) {
    try {
      const res = await fetch(`https://api.covid19api.com/total/country/${country}/status/deaths`)
      return res.json()
    } catch (err) {
      console.log(`Error fetching ${country}: ${err}`)
    }
  },
})

fetchCases.fail.watch(({ error, params }) => {
  console.error(error)
  console.error(params)
})
