import { createStore, createEvent, combine } from 'effector'
import { fetchCountries } from './effects'

const casesInitialState = {
  confirmed: {},
  recovered: {},
  deaths: {},
}

const uiInitialState = {
  loading: 0,
}

export const setCountriesCases = createEvent()
export const incrementLoading = createEvent()
export const decrementLoading = createEvent()
export const setSelectedCountries = createEvent()
export const setConfirmed = createEvent()
export const setRecovered = createEvent()
export const setDeaths = createEvent()

const caseEvents = {
  confirmed: setConfirmed,
  recovered: setRecovered,
  deaths: setDeaths,
}

// const mockData = [
//   { Country: 'United Kingdom', CountryCode: '', Lat: '0', Lon: '0', Cases: 7111, Status: 'deaths', Date: '2020-04-08T00:00:00Z' },
//   { Country: 'United Kingdom', CountryCode: '', Lat: '0', Lon: '0', Cases: 7993, Status: 'deaths', Date: '2020-04-09T00:00:00Z' },
// ]

const config = {
  type: 'line',
  series: [{}],
}

export const countryList = createStore([]).on(fetchCountries.doneData, (state, countries) => countries)
export const selectedCountries = createStore(['united-kingdom', 'italy']).on(setSelectedCountries, (state, countries) => countries)
selectedCountries.watch(console.log)

export const ui = createStore(uiInitialState)
  .on(incrementLoading, (state) => ({ ...state, loading: state.loading + 1 }))
  .on(decrementLoading, (state) => ({ ...state, loading: state.loading - 1 }))

const confirmed = createStore({}).on(setConfirmed, (state, { country, cases }) => ({
  ...state,
  [country]: cases,
}))

const recovered = createStore({}).on(setRecovered, (state, { country, cases }) => ({
  ...state,
  [country]: cases,
}))

const mockData = [{ values: [1, 2, 4, 5, 6] }, { values: [2, 4, 6, 8, 10] }]

export const deaths = createStore(config).on(setDeaths, (state, { country, cases }) => ({
  ...state,
  series: [...state.series, { values: cases.map(cases => cases.Cases) }],
}))

export const cases = combine({ confirmed, recovered, deaths })

export const fetchCases = async (country, status = 'deaths') => {
  try {
    incrementLoading()
    const cases = await (await fetch(`https://api.covid19api.com/total/country/${country}/status/${status}`)).json()
    caseEvents[status]({ country, cases })
    decrementLoading()
  } catch (err) {
    decrementLoading()
    console.log(`Error fetching ${country}: ${err}`)
  }
}

fetchCountries()
