import { createEffect } from 'effector'

export const fetchCountries = createEffect({
  async handler() {
    const res = await fetch(`https://api.covid19api.com/countries`)
    console.log('countries')
    return res.json()
  },
})

export const fetchConfirmed = createEffect({
  async handler(country) {
    const res = await fetch(`https://api.covid19api.com/total/country/${country}/status/deaths`)
    console.log('confirmed')
    return res.json()
  },
})