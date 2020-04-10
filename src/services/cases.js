import { combine, createEvent, createStore } from 'effector'
import { decrementLoading, incrementLoading } from './ui'

export const setConfirmed = createEvent()
export const setRecovered = createEvent()
export const setDeaths = createEvent()

const caseEvents = {
  confirmed: setConfirmed,
  recovered: setRecovered,
  deaths: setDeaths,
}

export const confirmed = createStore({}).on(setConfirmed, (state, { country, cases }) => ({
  ...state,
  [country]: cases,
}))

export const recovered = createStore({}).on(setRecovered, (state, { country, cases }) => ({
  ...state,
  [country]: cases,
}))

export const deaths = createStore({}).on(setDeaths, (state, { country, cases }) => ({
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
      cases: cases.map(it => it.Cases),
    })
    decrementLoading()
  } catch (err) {
    decrementLoading()
    console.log(`Error fetching ${country}: ${err}`)
  }
}
