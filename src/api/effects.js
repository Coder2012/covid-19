import { createEffect } from 'effector'

export const fetchCountries = createEffect({
  async handler() {
    const res = await fetch(`https://api.covid19api.com/countries`)
    return res.json()
  },
})
