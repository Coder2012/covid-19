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
export const setConfirmed = createEvent()
export const setRecovered = createEvent()
export const setDeaths = createEvent()

const caseEvents = {
  confirmed: setConfirmed,
  recovered: setRecovered,
  deaths: setDeaths,
}

export const countryList = createStore([]).on(fetchCountries.doneData, (state, countries) => countries)

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

// const deaths = createStore({}).on(setDeaths, (state, { country, cases }) => console.log(country, cases))

export const deaths = createStore({}).on(setDeaths, (state, { country, cases }) => ({
  ...state,
  [country]: cases,
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
