import { combine, createEvent, createStore } from 'effector-logger'
import { decrementLoading, incrementLoading } from './ui'

export const setConfirmed = createEvent('setConfirmed')
export const setRecovered = createEvent('setRecovered')
export const setDeaths = createEvent('setDeaths')

const caseEvents = {
  confirmed: setConfirmed,
  recovered: setRecovered,
  deaths: setDeaths,
}

export const confirmed = createStore({}, { name: 'confirmed' }).on(setConfirmed, (state, { country, cases }) => ({
  ...state,
  [country]: cases,
}))

export const recovered = createStore({}, { name: 'recovered' }).on(setRecovered, (state, { country, cases }) => ({
  ...state,
  [country]: cases,
}))

export const deaths = createStore({}, { name: 'deaths' }).on(setDeaths, (state, { country, cases }) => ({
  ...state,
  [country]: cases,
}))

export const casesList = combine({ confirmed, recovered, deaths })

export const fetchCases = async (country, status = 'deaths') => {
  try {
    incrementLoading()
    const cases = await (await fetch(`https://api.covid19api.com/total/country/${country}/status/${status}`)).json()
    caseEvents[status]({
      country,
      cases: cases.map((it) => it.Cases),
    })
  } catch (err) {
    console.log(`Error fetching ${country}: ${err}`)
  } finally {
    decrementLoading()
  }
}
