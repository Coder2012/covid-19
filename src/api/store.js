import { createStore } from 'effector'
import { fetchCountries, fetchConfirmed } from './effects'

export const countries = createStore([]).on(
  fetchCountries.doneData,
  (state, countries) => countries
)

export const confirmedByCountry = createStore([]).on(
  fetchConfirmed.doneData,
  (state, countries) => countries
)

fetchCountries()
