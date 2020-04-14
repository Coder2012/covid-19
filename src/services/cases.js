import { combine } from 'effector'
import { domain } from './domain'
import { decrementLoading, incrementLoading } from './ui'

export const setConfirmed = domain.event('setConfirmed')
export const setRecovered = domain.event('setRecovered')
export const setDeaths = domain.event('setDeaths')

const caseEvents = {
  confirmed: setConfirmed,
  recovered: setRecovered,
  deaths: setDeaths,
}

export const confirmed = domain.store({}, { name: 'confirmed' }).on(setConfirmed, (state, { country, cases }) => ({
  ...state,
  [country]: cases,
}))

export const recovered = domain.store({}, { name: 'recovered' }).on(setRecovered, (state, { country, cases }) => ({
  ...state,
  [country]: cases,
}))

export const deaths = domain.store({}, { name: 'deaths' }).on(setDeaths, (state, { country, cases }) => ({
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
