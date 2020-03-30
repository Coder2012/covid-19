import { createStore } from 'effector'
import { fetchCountries, fetchCases } from './effects'

export const countries = createStore([]).on(
  fetchCountries.doneData,
  (state, countries) => countries
)

export const casesByCountry = createStore([]).on(
  fetchCases.doneData,
  (state, countries) => countries
)

fetchCountries()
